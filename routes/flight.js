const express = require('express');
const router = express.Router();
// const upload=require('../middleware/upload_file')

const { 
    getAllFlights,
    getFlightsWithFilter,
    getSpecificFlight,
    postNewFlight,
    deleteFlight,
    updateFlight
  } = require('../controller/flight');
  
/**
 * @swagger
 * /flights:
 *   get:
 *     tags: [Flight]
 *     summary: Get a list of flights
 *     description: Retrieve a list of flights from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of flights.
 */

router.get("/flights", getAllFlights);

/**
 * @swagger
 * /flights/{id}:
 *   delete:
 *     tags: [Flight]
 *     summary: Delete a specific flight
 *     description: Delete a specific flight from the database.
 *     security:
 *     - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Integer ID of the flight to delete
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response.
 */

router.delete("/flights/:id", deleteFlight);

/**
 * @swagger
 * /flights/{id}:
 *   put:
 *     tags: [Flight]
 *     summary: Update a specific flight
 *     description: Update a specific flight based on its id.
 *     security:
 *     - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Integer ID of the flight to update
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             airline: string
 *             flightNumber: string
 *             departure_time: 10:00:00
 *             arrival_time: 12:00:00
 *             originId: 0
 *             destinationId: 0
 *     responses:
 *       200:
 *         description: Successful response.
 */

router.put("/flights/:id", updateFlight)

/**
 * @swagger
 * /flights/filter:
 *   post:
 *     tags: [Flight]
 *     summary: Get a list of filtered flight
 *     description: Retrieve a list of filtered flights from the database.
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             origin: string
 *             destination: string
 *             date: 2024-05-17
 *     responses:
 *       200:
 *         description: Successful response with a list of filtered flights.
 */

router.post("/flights/filter", getFlightsWithFilter)

/**
 * @swagger
 * /flights/create:
 *   post:
 *     tags: [Flight]
 *     summary: Create a new flight
 *     description: Insert a new flight to the database.
 *     security:
 *     - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             airline: string
 *             flightNumber: string
 *             departure_time: 10:00:00
 *             arrival_time: 12:00:00
 *             originId: 0
 *             destinationId: 0
 *     responses:
 *       201:
 *         description: Successful response with the flight that was just created.
 */

router.post("/flights/create", postNewFlight)

/**
 * @swagger
 * /flights/{id}:
 *   get:
 *     tags: [Flight]
 *     summary: Get a specific flight
 *     description: Retrieve a specific flight based on its id from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the flight to get
 *     responses:
 *       200:
 *         description: Successful response with the flight info.
 */

router.get("/flights/:id", getSpecificFlight)

module.exports = router;