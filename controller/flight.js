require('dotenv').config();
const Flight = require('../model/Flight');
const Airport = require('../model/Airport');
const Seat = require('../model/Seat');
const {Sequelize,Op} = require('sequelize');
const jwt = require('jsonwebtoken');
const key = process.env.TOKEN_SECRET_KEY;
const {sequelize} = require('../util/db_connect')

const getAllFlights = async(req,res,next)=>{
	try {
		const allFlights = await Flight.findAll({
			attributes: ['id','airline','flightNumber','departure_time','arrival_time'],
			include: [
				{
					model: Flight,
					as: 'origin_flight',
					attributes: ['name','code','city','province','timezone'],
				},
				{
					model: Flight,
					as: 'destination_flight',
					attributes: ['name','code','city','province','timezone'],
				},
				{
					model: Seat,
					attributes: ['id','type','capacity','price'],
					required: true,
				}
			]
		});
		res.status(200).json({
			status: "Success",
			message: "Successfully fetch all flight",
			flights: allFlights
		})
	} catch (error) {
		res.status(error.statusCode || 500).json({
			status: "Error",
			message: error.message
		})
	}
}

const deleteFlight = async(req,res,next)=>{
	try {
		const authorization = req.headers.authorization;
		const {id} = req.params;
		let token;
		if(authorization !== undefined && authorization.startsWith("Bearer ")){
			token = authorization.substring(7); 
		}else{
			const error = new Error("You need to login to access this page.");
			error.statusCode = 403;
			throw error;
		}
		const decoded = jwt.verify(token, key);
		if(decoded.role!='Admin'){
			const error = new Error(`You are not allowed to do this request!`);
			error.statusCode = 403;
			throw error;
		}
		const flight = await Flight.findByPk(id);
		if(!flight){
			const error = new Error(`Flight with id ${id} doesn't exist!`);
			error.statusCode = 404;
			throw error;
		}
		flight.destroy();
		res.status(200).json({
			status: "Success",
			message: "Flight deleted successfully.",
		})
	} catch (error) {
		res.status(error.statusCode || 500).json({
			status: "Error",
			message: error.message
		})
	}
}

const updateFlight = async(req,res,next)=>{
	try {
		const authorization = req.headers.authorization;
		const {id} = req.params;
		const {airline, flightNumber, departure_time, arrival_time, originId, destinationId} = req.body;
		let token;
		if(authorization !== undefined && authorization.startsWith("Bearer ")){
			token = authorization.substring(7); 
		}else{
			const error = new Error("You need to login to access this page.");
			error.statusCode = 403;
			throw error;
		}
		const decoded = jwt.verify(token, key);
		if(decoded.role!='Admin'){
			const error = new Error(`You are not allowed to do this request!`);
			error.statusCode = 403;
			throw error;
		}
		const flight = await Flight.findByPk(id);
		if(!flight){
			const error = new Error(`Flight with id ${id} doesn't exist!`);
			error.statusCode = 404;
			throw error;
		}
		flight.update({
			airline,
			flightNumber,
			departure_time,
			arrival_time,
			originId,
			destinationId
		});
		res.status(200).json({
			status: "Success",
			message: "Flight updated successfully.",
			flight: flight
		})
	} catch (error) {
		res.status(error.statusCode || 500).json({
			status: "Error",
			message: error.message
		})
	}
}

const getFlightsWithFilter = async(req,res,next)=>{
	try {
		const {origin, destination, date} = req.body;
		let whereCondition = {};
		if (origin && destination) {
			whereCondition = {
				[Op.and]: [
					[
						{
							[Op.or]: [
								{
										'$origin_airport.name$': { [Op.like]: `%${origin}%` }
								},
								{
										'$origin_airport.code$': { [Op.like]: `%${origin}%` }
								},
								{
										'$origin_airport.city$': { [Op.like]: `%${origin}%` }
								}
							]
						}
					],
					[
						{
							[Op.or]: [
								{
										'$destination_airport.name$': { [Op.like]: `%${destination}%` }
								},
								{
										'$destination_airport.code$': { [Op.like]: `%${destination}%` }
								},
								{
										'$destination_airport.city$': { [Op.like]: `%${destination}%` }
								}
							]
						}
					]
				]
			};
		} else if (origin) {
			whereCondition = {
				[Op.or]: [
					{
						'$origin_airport.name$': { [Op.like]: `%${origin}%` }
					},
					{
						'$origin_airport.code$': { [Op.like]: `%${origin}%` }
					},
					{
						'$origin_airport.city$': { [Op.like]: `%${origin}%` }
					}
				]
			};
		} else if (destination) {
			whereCondition = {
				[Op.or]: [
					{
						'$destination_airport.name$': { [Op.like]: `%${destination}%` }
					},
					{
						'$destination_airport.code$': { [Op.like]: `%${destination}%` }
					},
					{
						'$destination_airport.city$': { [Op.like]: `%${destination}%` }
					}
				]
			};
		}

		const filteredFlights = await Flight.findAll({
			attributes: [
					'id', 
					'airline', 
					'flightNumber', 
					'departure_time', 
					'arrival_time'		
			],
			include: [
					{
							model: Airport,
							as: 'origin_airport',
							attributes: ['name', 'code', 'city', 'province', 'timezone'],
							where: whereCondition.origin_airport || {}
					},
					{
							model: Airport,
							as: 'destination_airport',
							attributes: ['name', 'code', 'city', 'province', 'timezone'],
							where: whereCondition.destination_airport || {}
					},
					{
							model: Seat,
							attributes: ['id', 'type', 'capacity', 'price',
								[
									Sequelize.literal(`(
											SELECT COUNT(*)
											FROM tickets AS ticket
											WHERE
													ticket.seatId = seats.id
													AND DATE(ticket.date) = '${date}'
									)`),
									'ticketCount'
								]
							],
							required: true,
					}
			],
			where: whereCondition
	});
		if(!filteredFlights){
			const error = new Error(`Flight doesn't exist!`);
			error.statusCode = 400;
			throw error;
		}
		res.status(200).json({
			status: "Success",
			message: "Successfully fetch flight data",
			flights: filteredFlights
		})
	} catch (error) {
		res.status(error.statusCode || 500).json({
			status: "Error",
			message: error.message
		})
	}
}

const getSpecificFlight = async(req,res,next)=>{
	try {
		const {id} = req.params;
		const flight = await Flight.findOne({
			attributes: ['id','airline','flightNumber','departure_time','arrival_time'],
			include: [
				{
					model: Flight,
					as: 'origin_flight',
					attributes: ['name','code','city','province','timezone'],
				},
				{
					model: Flight,
					as: 'destination_flight',
					attributes: ['name','code','city','province','timezone'],
				},
				{
					model: Seat,
					attributes: ['id','type','capacity','price'],
					required: true,
				}
			],
			where: {
				id: id
			}
		});
		if(!flight){
			const error = new Error(`Flight with ID ${id} doesn't exist!`);
			error.statusCode = 400;
			throw error;
		}
		res.status(200).json({
			status: "Success",
			message: "Successfully fetch all flight",
			flights: flight
		})
	} catch (error) {
		res.status(error.statusCode || 500).json({
			status: "Error",
			message: error.message
		})
	}
}

const postNewFlight = async(req,res,next)=>{
	try {
		const authorization = req.headers.authorization;
		const {airline, flightNumber, departure_time, arrival_time, originId, destinationId} = req.body;
		
		let token;
		if(authorization !== undefined && authorization.startsWith("Bearer ")){
      token = authorization.substring(7); 
    }else{
      const error = new Error("You need to login to access this page.");
      error.statusCode = 403;
      throw error;
    }
		const decoded = jwt.verify(token, key);
		if(decoded.role!='Admin'){
			const error = new Error(`You are not allowed to do this request!`);
			error.statusCode = 403;
			throw error;
		}
		if(originId==destinationId){
			const error = new Error(`Origin and destination should not be the same flight!`);
			error.statusCode = 400;
			throw error;
		}
		const checkOrigin = await Flight.findOne({
			where:{
				id: originId
			}
		})
		if(!checkOrigin){
			const error = new Error(`Origin flight with ID ${originId} doesn't exist!`);
			error.statusCode = 400;
			throw error;
		}
		const checkDestination = await Flight.findOne({
			where:{
				id: destinationId
			}
		})
		if(!checkDestination){
			const error = new Error(`Destination flight with ID ${originId} doesn't exist!`);
			error.statusCode = 400;
			throw error;
		}
		const newFlight = await Flight.create({
			airline: airline,
			flightNumber: flightNumber,
			departure_time: departure_time,
			arrival_time: arrival_time,
			originId: originId,
			destinationId: destinationId
		})
		res.status(201).json({
			status: "Success",
			message: "Successfully added new flight!",
			flight: newFlight
		})
	} catch (error) {
		res.status(error.statusCode || 500).json({
			status: "Error",
			message: error.message
		})
	}
}

module.exports = {getAllFlights, getFlightsWithFilter, getSpecificFlight, postNewFlight, updateFlight, deleteFlight};