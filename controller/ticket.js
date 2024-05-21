require('dotenv').config();
const User = require('../model/User');
const Flight = require('../model/Flight');
const Airport = require('../model/Airport');
const Seat = require('../model/Seat');
const Ticket = require('../model/Ticket');
const jwt = require('jsonwebtoken');
const key = process.env.TOKEN_SECRET_KEY;
const {sequelize} = require('../util/db_connect')

const bookTicket = async(req,res,next)=>{
	try {
		const { nanoid } = await import('nanoid');
		const authorization = req.headers.authorization;
		const {flightId, seatId, fullName, email, phone} = req.body;
		
		let token;
		if(authorization !== undefined && authorization.startsWith("Bearer ")){
      token = authorization.substring(7); 
    }else{
      const error = new Error("You need to login to access this page.");
      error.statusCode = 403;
      throw error;
    }
		const decoded = jwt.verify(token, key);
		const flight = await Flight.findOne({
			attributes: ['id','airline','flightNumber','departure_time','arrival_time'],
			include: [
				{
					model: Airport,
					as: 'origin_airport',
					attributes: ['name','code','city','province','timezone'],
				},
				{
					model: Airport,
					as: 'destination_airport',
					attributes: ['name','code','city','province','timezone'],
				},
				{
					model: Seat,
					attributes: ['id','type','capacity','price'],
					required: true,
					where:{
						id: seatId
					}
				}
			],
			where: {
				id: flightId
			}
		});
		if(!flight){
			const error = new Error(`This ticket doesn't exist!`);
			error.statusCode = 400;
			throw error;
		}
		const countTicket = await Ticket.count({
			include:[
				{
					model: Seat,
					attributes: ['id','type','capacity','price'],
					required: true,
					where:{
						id: seatId
					}
				}
			],
		});
		if(flight.seats[0].capacity-countTicket==0){
			const error = new Error(`Ticket is sold out!`);
			error.statusCode = 409;
			throw error;
		}

		const newTicket = await Ticket.create({
			id: nanoid(16),
			fullName:fullName,
			email:email,
			phone:phone,
			userId: decoded.userId,
			flightId: flightId,
			seatId: seatId
		})

		res.status(201).json({
			status: "Success",
			message: "Successfully booked ticket!",
			ticket: newTicket
		})
	} catch (error) {
		res.status(error.statusCode || 500).json({
			status: "Error",
			message: error.message
		})
	}
}

const getAllTickets = async(req,res,next)=>{
	try {
		const authorization = req.headers.authorization;
		
		let token;
		if(authorization !== undefined && authorization.startsWith("Bearer ")){
      token = authorization.substring(7); 
    }else{
      const error = new Error("You need to login to access this page.");
      error.statusCode = 403;
      throw error;
    }
		const decoded = jwt.verify(token, key);
		const tickets = await Ticket.findAll({
			attributes: ['id','fullName','email','phone'],
			include:[
				{
					model:User,
					attributes:[],
					where: {
						id: decoded.userId
					}
				},
				{
					model: Flight,
					attributes: ['airline','flightNumber','departure_time','arrival_time'],
					include:[
						{
							model: Airport,
							as: 'origin_airport',
							attributes: ['name','code','city','province','timezone'],
						},
						{
							model: Airport,
							as: 'destination_airport',
							attributes: ['name','code','city','province','timezone'],
						}
					]
				},
				{
					model:Seat,
					attributes: ['type','price']
				}
			]
		});

		res.status(201).json({
			status: "Success",
			message: "Successfully booked ticket!",
			tickets: tickets
		})
	} catch (error) {
		res.status(error.statusCode || 500).json({
			status: "Error",
			message: error.message
		})
	}
}

const getSpecificTicket = async(req,res,next)=>{
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
		const ticket = await Ticket.findOne({
			attributes: ['id','fullName','email','phone','userId'],
			include:[
				{
					model: Flight,
					attributes: ['airline','flightNumber','departure_time','arrival_time'],
					include:[
						{
							model: Airport,
							as: 'origin_airport',
							attributes: ['name','code','city','province','timezone'],
						},
						{
							model: Airport,
							as: 'destination_airport',
							attributes: ['name','code','city','province','timezone'],
						}
					]
				},
				{
					model:Seat,
					attributes: ['type','price']
				}
			],
			where:{
				id: id
			}
		})
		if(!ticket){
			const error = new Error(`Ticket doesn't exist!`);
			error.statusCode = 400;
			throw error;
		}
		if(ticket.userId!=decoded.userId){
			const error = new Error(`You can't access this ticket!`);
			error.statusCode = 403;
			throw error;
		}

		res.status(201).json({
			status: "Success",
			message: "Successfully booked ticket!",
			ticket: ticket
		})
	} catch (error) {
		res.status(error.statusCode || 500).json({
			status: "Error",
			message: error.message
		})
	}
}

module.exports = {bookTicket, getAllTickets, getSpecificTicket}