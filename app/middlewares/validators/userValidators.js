const Joi = require("joi");

/**
 * TODO: Validate user registration data.
 * @function
 * @param {Object} dataUser - The user registration data to validate.
 * @returns {Object} - Validation result containing error details.
*/

exports.signUpValidator = (dataUser) => {

    const createUserSchema = Joi.object(
        {
            firstName: Joi.string().required().min(2).max(50),
            lastName: Joi.string().required().min(2).max(50),
            email: Joi.string().email().required(),
            password: Joi.string().required().min(8).max(50),
        }
    );

    return createUserSchema.validate(dataUser);
};

/**
 * TODO: Validate user login credentials.
 * @function
 * @param {Object} dataUser - The user login credentials to validate.
 * @returns {Object} - Validation result containing error details.
*/

exports.signInValidator = (dataUser) => {

    const createUserSchema = Joi.object(
        {
            email: Joi.string().email().required(),
            password: Joi.string().required().min(8).max(50),
        }
    );

    return createUserSchema.validate(dataUser);
};
