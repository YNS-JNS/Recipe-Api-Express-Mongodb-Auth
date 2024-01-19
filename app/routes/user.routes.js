module.exports = app => {
    const { auth } = require("../controllers/user.controller.js")
    const router = require("express").Router();

    // Create a new User
    /**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication operations
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               status_code: 201
 *               message: user created successfully.
 *               data: { _id: '...', email: 'user@example.com', ... }
 *               token: '...'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               message: 'Validation error: Name is required.'
 *
 * components:
 *   schemas:
 *     UserSignup:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */
    router.post("/signup", auth.signUp);
    router.post("/signin", auth.signIn);

    // ________________________________________________________________________________________________
    app.use('/api/user', router);
}