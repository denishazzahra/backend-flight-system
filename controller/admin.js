require('dotenv').config();
const User = require('../model/User');
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const key = process.env.TOKEN_SECRET_KEY;
const algorithm = process.env.ENCRYPTION_ALGORITHM;
const encryption_key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const encryption_iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

const loginHandler = async (req,res,next)=>{
	try {
		const {emailOrPhone, password} = req.body;
		const currentUser = await User.findOne({
			where:{
        [Op.or]: [
          {
            email: encryptText(emailOrPhone)
          },
          {
            phone: encryptText(emailOrPhone)
          }
        ]
			}
		});

		if (currentUser == undefined){
			const error = new Error("Wrong email or password!");
			error.statusCode = 400;
			throw error;
		}
    
		const checkPassword = await bcrypt.compare(password, currentUser.password); 
    
		if (checkPassword === false){
      const error = new Error("Wrong email/phone or password!");
			error.statusCode = 400;
			throw error;
		}

    if(currentUser.role!='Admin'){
      const error = new Error("You don't have access!");
      error.statusCode = 403;
      throw error;
    }

		const token = jwt.sign({
			userId: currentUser.id,
			role: currentUser.role
			}, key,{
			algorithm: "HS256",
		})

		res.status(200).json({
			status: "Success",
			message: "Login Successfull!",
			token
		})

	} catch (error) {
			res.status(error.statusCode || 500).json({
        status: "Error",
        message: error.message
			})
	}
}

function encryptText(text){
  const cipher = crypto.createCipheriv(algorithm, encryption_key, encryption_iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptText(text){
  const decipher = crypto.createDecipheriv(algorithm, encryption_key, encryption_iv);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = {loginHandler};