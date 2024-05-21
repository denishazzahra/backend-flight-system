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
		if(decoded.id!='admin'){
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

module.exports = {postNewSeat};