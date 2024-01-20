const db = require("../models");
const UserModel = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { signUpValidator, signInValidator } = require("../middlewares/validators/userValidators");

/**
 * TODO: Controller methods for user authentication.
 * @namespace auth
 */

exports.auth = {

    /**
    * TODO: Register a new user.
    * @function
    * @async
    * @memberof auth
    * @param {Object} req - Express request object.
    * @param {Object} res - Express response object.
    * @returns {Promise<void>} - A Promise that resolves after processing.
    */

    signUp: (req, res) => {

        // TODO: Validate input using Joi schema
        const { error } = signUpValidator(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        // TODO: Destructring the email
        const { email } = req.body;

        // TODO: Check if the user already exists
        UserModel.findOne({ email })
            .then(user => {

                if (user) {
                    return res.status(409).json({
                        message: "This user already exists! Please create a new one with another email"
                    })
                }

                // TODO: Hash the password before storing it in the database
                const saltRounds = 10; // * Nombre de "rounds" utilisés pour le hachage du mot de passe

                bcrypt.hash(req.body.password, saltRounds)
                    .then(
                        // * Si le hachage est réussi
                        hash => {
                            // * Create a new user with hash password 
                            const newUser = new UserModel(
                                {
                                    ...req.body,
                                    password: hash // * assign hash password
                                }
                            );

                            // TODO: Save the new user
                            newUser.save()
                                .then(
                                    user => {
                                        // TODO: Generate a token for the newly created user
                                        const newToken = generateToken({
                                            sub: user.id,
                                            firstName: user.firstName,
                                            lastName: user.lastName
                                        });

                                        // * Send response
                                        res.status(201).json({
                                            message: "user created successfully.",
                                            data: user,
                                            token: newToken
                                        })
                                    }
                                )
                                .catch(
                                    err => {
                                        res.status(500).json(
                                            {
                                                message: "Some error occurred while creating the user.",
                                                error: err.message
                                            }
                                        )
                                    }
                                );
                        }
                    )
                    .catch(err => {
                        res.status(500).json(
                            {
                                message: "Error hashing password!",
                                error: err.message
                            }
                        )
                    });
            })
            .catch(
                err => {
                    res.status(500).json(
                        {
                            message: "Error checking user existence.",
                            error: err.message
                        }
                    )
                }
            );
    },

    /**
     * Sign in an existing user.
     * @function
     * @async
     * @memberof auth
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} - A Promise that resolves after processing.
     */

    signIn: (req, res) => {

        const { email, password } = req.body;

        // TODO: Validate input using Joi schema
        const { error } = signInValidator(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        // TODO: Check if the user with the provided email exists
        UserModel.findOne({ email })
            .then(
                user => {
                    if (!user) {
                        return res.status(401).json({ message: 'Email or password is incorrect' });
                    }

                    // TODO: Compare the provided password with the stored hashed password
                    bcrypt.compare(password, user.password)
                        .then(
                            validUser => {

                                if (!validUser) {
                                    return res.status(401).json({ message: 'Incorrect login or password !' });
                                } else {

                                    // TODO: Generate a token for the authenticated user
                                    const token = generateToken({
                                        sub: user.id,
                                        firstName: user.firstName,
                                        lastName: user.lastName
                                    })

                                    res.status(200).json({
                                        token
                                    })
                                }

                            }
                        )
                        .catch(err => {
                            res.status(500).json(
                                {
                                    message: "Error checking password.",
                                    error: err.message
                                }
                            )
                        });
                }
            )
            .catch(
                err => {
                    res.status(500).json(
                        {
                            message: "Error checking user existence.",
                            error: err.message
                        }
                    )
                }
            );
    },

    // TODO: Log out function
    logOut: null,

};

// ________________________________________________________________________________________
/**
 * TODO: Generate a JSON Web Token (JWT) for authentication.
 * @function
 * @param {Object} payload - Payload to be included in the token.
 * @returns {string} - The generated JWT.
 */

const generateToken = (payload) => {
    const token = jwt.sign(payload, 'SECRET_KEY_TOKEN', {
        expiresIn: '1d',
    })

    return token;
}
// ________________________________________________________________________________________