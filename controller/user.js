require('dotenv').config();
const User = require('../model/User');
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = process.env.TOKEN_SECRET_KEY;
const cloudinary = require('../util/cloudinary_config');
const upload=require('../middleware/upload_file');
const fs = require('fs');

const postUser = async(req,res,next)=>{
  try {
    const { nanoid } = await import('nanoid');
    const {
      fullName, email, phone, password, role
    } = req.body;

		const checkEmail = await User.findOne({
			where:{
				email: email
			}
		});

		if(checkEmail){
			const error = new Error("Email is already registered.");
			error.statusCode = 400;
			throw error;
		}
		
    //hashed password user    
    const hashedPassword = await bcrypt.hash(password, 5);

    //insert data ke tabel users
    await User.create({
      id: nanoid(16),
      fullName: fullName,
      email: email,
      phone: phone,
      password : hashedPassword,
      role: role
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
            email: emailOrPhone
          },
          {
            phone: emailOrPhone
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
			expiresIn: "60d"
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
      attributes: ['id','fullName','email','profilePicture','role'],
    })

    if(user == undefined){
        res.status(400).json({
        status: "Error",
        message: `User with id ${userId} doesn't exist!`
        })
    }
    res.status(200).json({
        status:"Success",
        message: "Succesfully fetch user data",
        user: user
    })

  }catch(error){
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

const editProfile=async (req,res,next)=>{
  try {
    const authorization=req.headers.authorization
    const { email, fullName } = req.body;

    //kalau user kosongin jangan diubah di db nya
    if(email==null || fullName==null){
      const error=new Error('Email, and full name can\'t be empty!')
      error.statusCode=400
      throw error
    }

    let token
    if(authorization!==null && authorization.startsWith("Bearer ")){
      token=authorization.substring(7)
    }else{
      const error=new Error("You need to login")
      error.statusCode=403
      throw error
    }
    const decoded=jwt.verify(token,key)
    const currentUser=await User.findOne({
      where:{
        id:decoded.userId
      },
      attributes:['id','fullName','email','profilePicture']
    })
    if(!currentUser){
      const error=new Error(`User with ID ${decoded.userId} doesn't exist!`)
      error.statusCode=400
      throw error
    }
    let imageUrl

    //kalau ada gambar diupload dia update profpic, kalo gaada skip
    if(req.file){
      const file=req.file
      const uploadOption={
        folder:'FlightSystem/ProfilePic/',
        public_id:`user_${currentUser.id}`,
        overwrite:true
      }
      const uploadFile=await cloudinary.uploader.upload(file.path,uploadOption)
      imageUrl=uploadFile.secure_url
      fs.unlinkSync(file.path)
      currentUser.update(
        {
          profilePicture: imageUrl
        }
      )
    }

    //cek email baru udah kepake atau belum
    const checkEmail = await User.findOne({
      where:{
        email: email
      }
    })
    if(checkUser && checkEmail.id!=currentUser.id){
      const error=new Error('Email is already used!')
      error.statusCode=400
      throw error
    }    

    //update akun
    currentUser.update({
      fullName,
      email
    })

    res.status(200).json({
      status:"Success",
      updatedUser:currentUser
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error
    })
  }
}

const getAllUsers = async(req, res, next)=>{
  try {
    const users = await User.findAll({
      attributes: ['id','fullName','email','profilePicture','role'],
    });

    res.status(200).json({
      status: "Success",
      message: "Successfully fetch all user data",
      users: users
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

module.exports = {
  postUser, loginHandler, getUserByToken, editProfile, getAllUsers,
}