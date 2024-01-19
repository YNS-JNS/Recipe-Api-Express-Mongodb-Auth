const Joi = require("joi");

/**
 * Validate user registration data.
 * @function
 * @param {Object} dataUser - The user registration data to validate.
 * @returns {Object} - Validation result containing error details.
 */

exports.singUpValidator = (dataUser) => {

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
