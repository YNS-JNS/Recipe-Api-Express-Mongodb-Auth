const db = require("../models");
const UserModel = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { singUpValidator, singInValidator } = require("../validators/userValidators");

/**
 * Controller methods for user authentication.
 * @namespace auth
 */

export const auth = {

    /**
   * Register a new user.
   * @function
   * @async
   * @memberof auth
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>} - A Promise that resolves after processing.
   */
    singUp: (req, res) => {

        // Checking if there an error
        const { error } = singUpValidator(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        // Check if the user already exists
        UserModel.findOne(req.body.email)
            .then(user => {

                if (user) {
                    return res.status().json({
                        message: "This user already exists! Please create a new one with another email"
                    })
                }

                // TODO: Hash the password before storing it in the database
                const saltRounds = 10; // Nombre de "rounds" utilisés pour le hachage du mot de passe
                // Methode pour crypter le password
                bcrypt.hash(req.body.password, saltRounds)
                    .then(
                        // Si le hachage est réussi
                        hash => {
                            // create user with 
                            const newUser = new UserModel(
                                {
                                    ...req.body,
                                    password: hash
                                }
                            );


                            // Saving new user
                            newUser.save()
                                .then(
                                    user => {
                                        // Generate a token for the newly created user
                                        const newToken = generateToken({
                                            sub: user.id,
                                            firstName: user.firstName,
                                            lastName: user.lastName
                                        });

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
    singIn: (req, res) => {

        const { email, password } = req.body;

        // Validate input using Joi schema
        const { error } = singInValidator(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        // Check if the user with the provided email exists
        UserModel.findOne({ email })
            .then(
                user => {
                    if (!user) {
                        return res.status(401).json({ message: 'Email or password is incorrect' });
                    }

                    bcrypt.compare(password, user.password)
                        .then(
                            validUser => {

                                if (!validUser) {
                                    return res.status(401).json({ message: 'Incorrect login or password !' });
                                } else {

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
    // Log out function
    logOut: null,
};

/**
 * Generate a JSON Web Token (JWT) for authentication.
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