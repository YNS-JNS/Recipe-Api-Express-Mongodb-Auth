const db = require("../models");
const UserModel = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { singUpValidator } = require("../validators/userValidators");

export const auth = {

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
                                        res.status(201).json({
                                            message: "user created successfully.",
                                            data: user
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
    singIn: null,
    generateToken: null,
    logOut: null,
}