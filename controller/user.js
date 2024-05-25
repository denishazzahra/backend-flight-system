require('dotenv').config();
const User = require('../model/User');
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = process.env.TOKEN_SECRET_KEY;
const cloudinary = require('../util/cloudinary_config');
const upload=require('../middleware/upload_file');
const fs = require('fs');
const crypto = require('crypto');
const algorithm = process.env.ENCRYPTION_ALGORITHM;
const encryption_key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const encryption_iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

const postUser = async(req,res,next)=>{
  try {
    const { nanoid } = await import('nanoid');
    const {
      fullName, email, phone, password
    } = req.body;

		const checkEmail = await User.findOne({
			where:{
				email: encryptText(email)
			}
		});

		if(checkEmail){
			const error = new Error("Email is already registered.");
			error.statusCode = 400;
			throw error;
		}

    const checkPhone = await User.findOne({
			where:{
				phone: encryptText(phone)
			}
		});

		if(checkPhone){
			const error = new Error("Phone is already registered.");
			error.statusCode = 400;
			throw error;
		}
		
    //hashed password user    
    const hashedPassword = await bcrypt.hash(password, 5);

    //insert data ke tabel users
    await User.create({
      id: nanoid(16),
      fullName: encryptText(fullName),
      email: encryptText(email),
      phone: encryptText(phone),
      password : hashedPassword,
      role: "User"
    });

    //send response
    res.status(201).json({
      status: "Success",
      message: "Register Successfull!",
    })

  } catch (error) {
    //jika status code belum terdefined maka status = 500;
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

const loginHandler = async (req,res,next)=>{
	try {
		// ambil data dari req body
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
		//apabila user tidak ditemukan
		if (currentUser == undefined){
			const error = new Error("Wrong email or password!");
			error.statusCode = 400;
			throw error;
		}
		const checkPassword = await bcrypt.compare(password, currentUser.password); 

		//apabila password salah / tidak matched
		if (checkPassword === false){
			const error = new Error("Wrong email/phone or password!");
			error.statusCode = 400;
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

const getUserByToken = async(req,res,next)=>{
  try {
    //mengambil header
    const header = req.headers;
    
    //mengambil header auth
    const authorization = header.authorization;
    let token;

    if(authorization !== undefined && authorization.startsWith("Bearer ")){
      //mengilangkan string "Bearer "
      token = authorization.substring(7); 
    }else{
      const error = new Error("You need to login to access this page.");
      error.statusCode = 403;
      throw error;
    }
    //step 2 ekstrak payload menggunakan jwt.verify
    const payload = jwt.verify(token, key);

    //step 3 cari user berdasarkan payload.userId
    const userId=payload.userId
    const user = await User.findOne({
      where:{id: userId},
      attributes: ['id','fullName','email','phone','profilePicture','role'],
    })
    if(user == undefined){
      res.status(400).json({
      status: "Error",
      message: `User with id ${userId} doesn't exist!`
      })
    }
    const decryptedUser = {
      id: user.id,
      fullName: decryptText(user.fullName),
      email: decryptText(user.email),
      phone: decryptText(user.phone),
      profilePicture: user.profilePicture,
      role: user.role,
    };
    res.status(200).json({
      status:"Success",
      message: "Succesfully fetch user data",
      user: decryptedUser
    })

  }catch(error){
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

const editProfile = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { email, fullName, phone } = req.body;

    // Check if email, phone, or fullName is null or undefined
    if (!email || !phone || !fullName) {
      const error = new Error('Full name, email, and phone number can\'t be empty!');
      error.statusCode = 400;
      throw error;
    }

    let token;
    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.substring(7);
    } else {
      const error = new Error("You need to login");
      error.statusCode = 403;
      throw error;
    }

    const decoded = jwt.verify(token, key);
    const currentUser = await User.findOne({
      where: {
        id: decoded.userId
      },
      attributes: ['id', 'fullName', 'email', 'phone', 'profilePicture']
    });

    if (!currentUser) {
      const error = new Error(`User with ID ${decoded.userId} doesn't exist!`);
      error.statusCode = 400;
      throw error;
    }

    const checkEmail = await User.findOne({
      where: {
        email: encryptText(email)
      }
    });

    if (checkEmail && checkEmail.id != currentUser.id) {
      const error = new Error('Email is already used!');
      error.statusCode = 400;
      throw error;
    }

    const checkPhone = await User.findOne({
      where: {
        phone: encryptText(phone)
      }
    });

    if (checkPhone && checkPhone.id != currentUser.id) {
      const error = new Error('Phone is already used!');
      error.statusCode = 400;
      throw error;
    }

    // Update account
    await currentUser.update({
      fullName: encryptText(fullName),
      email: encryptText(email),
      phone: encryptText(phone)
    });

    const decryptedUser = {
      fullName: decryptText(currentUser.fullName),
      email: decryptText(currentUser.email),
      phone: decryptText(currentUser.phone),
      profilePicture: currentUser.profilePicture
    };

    res.status(200).json({
      status: "Success",
      updatedUser: decryptedUser
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message || error
    });
  }
};


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

module.exports = {
  postUser, loginHandler, getUserByToken, editProfile,
}