require('dotenv').config();
const Flight = require('../model/Flight');
const Seat = require('../model/Seat');
const jwt = require('jsonwebtoken');
const key = process.env.TOKEN_SECRET_KEY;
const {sequelize} = require('../util/db_connect')

const postNewSeat = async(req,res,next)=>{
	try {
		const authorization = req.headers.authorization;
		const {type, capacity, price, flightId} = req.body;
		
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
		const checkFlight = await Flight.findOne({
			where:{
				id: flightId
			}
		})
		if(!checkFlight){
			const error = new Error(`Flight with ID ${originId} doesn't exist!`);
			error.statusCode = 400;
			throw error;
		}
		if(capacity<1){
			const error = new Error(`Capacity should be positive number!`);
			error.statusCode = 400;
			throw error;
		}
		if(price<0){
			const error = new Error(`Price can't be negative!`);
			error.statusCode = 400;
			throw error;
		}
		if(type!='Business' && type!='Economy'){
			const error = new Error(`Invalid type!`);
			error.statusCode = 400;
			throw error;
		}

		const newSeat = await Seat.create({
			type: type,
			capacity: capacity,
			price: price,
			flightId: flightId
		})
		res.status(201).json({
			status: "Success",
			message: "Successfully added new seat!",
			seat: newSeat
		})
	} catch (error) {
		res.status(error.statusCode || 500).json({
			status: "Error",
			message: error.message
		})
	}
}

const deleteSeat = async(req,res,next)=>{
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
		const seat = await Seat.findByPk(id);
		if(!seat){
			const error = new Error(`Seat with id ${id} doesn't exist!`);
			error.statusCode = 404;
			throw error;
		}
		seat.destroy();
		res.status(200).json({
			status: "Success",
			message: "Seat deleted successfully.",
		})
	} catch (error) {
		res.status(error.statusCode || 500).json({
			status: "Error",
			message: error.message
		})
	}
}

const updateSeat = async(req,res,next)=>{
	try {
		const authorization = req.headers.authorization;
		const {id} = req.params;
		const {type, capacity, price, flightId} = req.body;
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
		const seat = await Seat.findByPk(id);
		if(!seat){
			const error = new Error(`Seat with id ${id} doesn't exist!`);
			error.statusCode = 404;
			throw error;
		}
		seat.update({
			type,
			capacity,
			price,
			flightId
		});
		res.status(200).json({
			status: "Success",
			message: "Seat updated successfully.",
			seat: seat
		})
	} catch (error) {
		res.status(error.statusCode || 500).json({
			status: "Error",
			message: error.message
		})
	}
}

const getAllSeats = async(req,res,next)=>{
	try {
		const seats = await Seat.findAll({});
		res.status(200).json({
			status: "Success",
			message: "Successfully fetch all seats!",
			seats: seats
		})
	} catch (error) {
		res.status(error.statusCode || 500).json({
			status: "Error",
			message: error.message
		})
	}
}

module.exports = {postNewSeat, deleteSeat, updateSeat, getAllSeats};