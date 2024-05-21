const express = require('express');
const router = express.Router();

const { 
    bookTicket,
    getAllTickets,
    getSpecificTicket
  } = require('../controller/ticket');

//lihat semua tiket
router.get("/tickets", getAllTickets)

//booking tiket
router.post("/tickets/booking", bookTicket)

//lihat tiket spesifik
router.get("/tickets/:id", getSpecificTicket)

module.exports = router;