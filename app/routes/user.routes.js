/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignUp:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name of the user
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           description: Password for the user
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *     UserSignIn:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           description: Password for the user
 *       required:
 *         - email
 *         - password
 */

module.exports = app => {
    const { auth } = require("../controllers/user.controller.js")
    const router = require("express").Router();

    /**
        * @swagger
        * /api/user/signup:
        *   post:
        *     summary: Register a new user
        *     tags:
        *       - Authentication
        *     requestBody:
        *       required: true
        *       content:
        *         application/json:
        *           schema:
        *             $ref: '#/components/schemas/UserSignUp'
        *     responses:
        *       '201':
        *         description: Successfully registered a new user
        *         content:
        *           application/json:
        *             example:
        *               message: 'user created successfully.'
        *               data: { user details }
        *               token: 'generated_token'
        *       '400':
        *         description: Bad request
        *         content:
        *           application/json:
        *             example:
        *               message: 'Validation error: Email is required.'
        *       '409':
        *         description: Conflict
        *         content:
        *           application/json:
        *             example:
        *               message: 'This user already exists!'
        *       '500':
        *         description: Internal Server Error
        *         content:
        *           application/json:
        *             example:
        *               message: 'Error checking user existence.'
        *               error: '...'
        */
    router.post("/signup", auth.signUp);

    /**
     * @swagger
     * /api/user/signin:
     *   post:
     *     summary: Sign in an existing user
     *     tags:
     *       - Authentication
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserSignIn'
     *     responses:
     *       '200':
     *         description: Successfully signed in
     *         content:
     *           application/json:
     *             example:
     *               token: 'generated_token'
     *       '400':
     *         description: Bad request
     *         content:
     *           application/json:
     *             example:
     *               message: 'Validation error: Email is required.'
     *       '401':
     *         description: Unauthorized
     *         content:
     *           application/json:
     *             example:
     *               message: 'Email or password is incorrect'
     *       '500':
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             example:
     *               message: 'Error checking user existence.'
     *               error: '...'
     */
    router.post("/signin", auth.signIn);

    // ________________________________________________________________________________________________
    app.use('/api/user', router);
}