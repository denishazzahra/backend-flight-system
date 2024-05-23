const express = require('express');
const router = express.Router();

const { 
    postNewSeat, deleteSeat, updateSeat, getAllSeats
  } = require('../controller/seat');

/**
 * @swagger
 * /seats:
 *   get:
 *     tags: [Seat]
 *     summary: Get a list of seats
 *     description: Retrieve a list of seats from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of seats.
 */

router.get("/seats", getAllSeats)

/**
 * @swagger
 * /seats/{id}:
 *   delete:
 *     tags: [Seat]
 *     summary: Delete a specific seat
 *     description: Delete a specific seat from the database.
 *     security:
 *     - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Integer ID of the seat to delete
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response.
 */

router.delete("/seats/:id", deleteSeat)

/**
 * @swagger
 * /seats/{id}:
 *   put:
 *     tags: [Seat]
 *     summary: Update a specific seat
 *     description: Update a specific seat based on its id.
 *     security:
 *     - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Integer ID of the seat to update
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             type: Business
 *             capacity: 10
 *             price: 1000000
 *             flightId: 0
 *     responses:
 *       200:
 *         description: Successful response.
 */

router.put("/seats/:id", updateSeat)

/**
 * @swagger
 * /seats/create:
 *   post:
 *     tags: [Seat]
 *     summary: Create a new seat
 *     description: Insert a new seat into the database (admin only).
 *     security:
 *     - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             type: Business
 *             capacity: 10
 *             price: 1000000
 *             flightId: 0
 *     responses:
 *       201:
 *         description: Successful response with the seat that was just created.
 */  

router.post("/seats/create", postNewSeat)

module.exports = router;