const express = require('express');
const router = express.Router();
// const upload=require('../middleware/upload_file')

const { 
    getAllFlights,
    getFlightsWithFilter,
    getSpecificFlight,
    postNewFlight
  } = require('../controller/flight');
  
// lihat all flights
router.get("/flights", getAllFlights);

//lihat filtered flights
router.post("/flights/filter", getFlightsWithFilter)

//buat flight baru
router.post("/flights/create", postNewFlight)

//lihat specific flight
router.get("/flights/:id", getSpecificFlight)

module.exports = router;