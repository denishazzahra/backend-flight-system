const express = require('express');
const router = express.Router();
const upload=require('../middleware/upload_file')

const { 
    postUser, loginHandler, getUserByToken,
    editProfile,
  } = require('../controller/user');
  
// register
router.post("/users/register", postUser);

// login
router.post("/users/login", loginHandler);

// lihat profil sendiri
router.get("/users", getUserByToken);

// ganti profile picture
router.put("/users/edit-account", upload.single('image'), editProfile)


module.exports = router;