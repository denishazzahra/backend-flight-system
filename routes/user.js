const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload_file');

const { 
    postUser, loginHandler, getUserByToken,
    editProfile,
} = require('../controller/user');

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [User]
 *     summary: Create a new user
 *     description: Insert a new user into the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             fullName: John Doe
 *             email: john.doe@example.com
 *             phone: "1234567890"
 *             password: "securepassword"
 *     responses:
 *       201:
 *         description: Successful response.
 */

router.post("/users/register", postUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [User]
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

router.post("/users/login", loginHandler);

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [User]
 *     summary: Get user info
 *     description: Get user info based on token.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with user info.
 */

router.get("/users", getUserByToken);

/**
 * @swagger
 * /users/edit-account:
 *   put:
 *     tags: [User]
 *     summary: Update account user
 *     description: Update account info of a user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful response with user info that was just updated.
 */

router.put("/users/edit-account", upload.single('image'), editProfile);

module.exports = router;
