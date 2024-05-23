const express = require('express');
const router = express.Router();

const {loginHandler} = require('../controller/admin');

/**
 * @swagger
 * /admins/login:
 *   post:
 *     tags: [Admin]
 *     summary: Login 
 *     description: Login and get token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailOrPhone:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             emailOrPhone: john.doe@example.com
 *             password: "securepassword"
 *     responses:
 *       200:
 *         description: Successful response with a token.
 */

router.post("/admins/login", loginHandler);

module.exports = router;