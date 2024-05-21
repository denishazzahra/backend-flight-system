const express = require('express');
const router = express.Router();

const { 
    postNewAirport,
    getAllAirports
  } = require('../controller/airport');

//lihat semua airport
router.get("/airports", getAllAirports)

//buat airport baru
router.post("/airports/create", postNewAirport)

module.exports = router;