const express = require('express');
const router = express.Router();

const { 
    bookTicket,
    getAllTickets,
    getSpecificTicket
  } = require('../controller/ticket');

/**
 * @swagger
 * /tickets:
 *   get:
 *     tags: [Ticket]
 *     summary: Get a list of ticket
 *     description: Retrieve a list of ticket of a user from the database.
 *     security:
 *     - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with a list of airports.
 */

router.get("/tickets", getAllTickets)

/**
 * @swagger
 * /tickets/booking:
 *   post:
 *     tags: [Ticket]
 *     summary: Book a new ticket
 *     description: Insert a new ticket into the database.
 *     security:
 *     - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             flightId: 0
 *             seatId: 0
 *             fullName: 12:00:00
 *             email: 13:00:00
 *             phone: 0
 *             date: 2024-05-17
 *     responses:
 *       201:
 *         description: Successful response with the ticket that was just booked.
 */

router.post("/tickets/booking", bookTicket)

/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     tags: [Ticket]
 *     summary: Get a specific ticket
 *     description: Retrieve a specific ticket based on its id from the database.
 *     security:
 *     - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the ticket to get
 *     responses:
 *       200:
 *         description: Successful response with the ticket info.
 */

router.get("/tickets/:id", getSpecificTicket)

module.exports = router;