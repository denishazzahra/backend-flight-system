require('dotenv').config();
const Airport = require('../model/Airport');
const jwt = require('jsonwebtoken');
const key = process.env.TOKEN_SECRET_KEY;
const {sequelize} = require('../util/db_connect')

const postNewAirport = async(req,res,next)=>{
	try {
		const authorization = req.headers.authorization;
		const {name, city, province, code, timezone} = req.body;
		
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
		if(!name || !city || !province || !code || !timezone){
			const error = new Error(`Name, city, province, code, and timezone can't be null!`);
			error.statusCode = 400;
			throw error;
		}
		const checkCode = await Airport.findOne({
			where:{
				code: code
			}
		})
		if(!checkCode){
			const error = new Error(`Airport is already registered!`);
			error.statusCode = 400;
			throw error;
		}
		if(timezone!='WIB' && timezone!='WITA' && timezone!='WIT'){
			const error = new Error(`Timezone should be WIB, WITA, or WIT!`);
			error.statusCode = 400;
			throw error;
		}

		const newAirport = await Airport.create({
			name: name,
			city: city,
			province: province,
			code: code,
			timezone: timezone
		})
		res.status(201).json({
			status: "Success",
			message: "Successfully added new airport!",
			airport: newAirport
		})
	} catch (error) {
		res.status(error.statusCode || 500).json({
			status: "Error",
			message: error.message
		})
	}
}

const getAllAirports = async(req,res,next)=>{
	try {
		const airports = await Airport.findAll({});
		res.status(200).json({
			status: "Success",
			message: "Successfully fetch all airport!",
			airport: airports
		})
	} catch (error) {
		res.status(error.statusCode || 500).json({
			status: "Error",
			message: error.message
		})
	}
}

module.exports = {postNewAirport, getAllAirports};