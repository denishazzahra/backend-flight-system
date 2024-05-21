const express = require('express');
const router = express.Router();

const { 
    postNewSeat
  } = require('../controller/seat');

//buat flight baru
router.post("/seats/create", postNewSeat)

module.exports = router;