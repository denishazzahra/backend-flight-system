const express = require('express');
const router = express.Router();

const { 
    postNewAirport,
    getAllAirports,
    deleteAirport,
    updateAirport
  } = require('../controller/airport');

/**
 * @swagger
 * /airports:
 *   get:
 *     tags: [Airport]
 *     summary: Get a list of airports
 *     description: Retrieve a list of airports from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of airports.
 */

router.get("/airports", getAllAirports)

/**
 * @swagger
 * /airports/{id}:
 *   delete:
 *     tags: [Airport]
 *     summary: Delete a specific airport
 *     description: Delete a specific airport from the database.
 *     security:
 *     - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Integer ID of the airport to delete
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response.
 */

router.delete("/airports/:id", deleteAirport)

/**
 * @swagger
 * /airports/{id}:
 *   put:
 *     tags: [Airport]
 *     summary: Update a specific airport
 *     description: Update a specific airport based on its id.
 *     security:
 *     - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Integer ID of the airport to update
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             name: string
 *             city: string
 *             province: string
 *             code: string
 *             timezone: WIB
 *     responses:
 *       200:
 *         description: Successful response.
 */

router.put("/airports/:id", updateAirport)

/**
 * @swagger
 * /airports/create:
 *   post:
 *     tags: [Airport]
 *     summary: Create a new airport
 *     description: Insert a new airport into the database.
 *     security:
 *     - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             name: string
 *             city: string
 *             province: string
 *             code: string
 *             timezone: WIB
 *     responses:
 *       201:
 *         description: Successful response with a list of airports.
 */

router.post("/airports/create", postNewAirport)

module.exports = router;