const jwt = require("jsonwebtoken");

/**
 * Authentication middleware for protecting routes using JWT.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
*/

exports.authMiddleware = (req, res, next) => {

    try {

        // Todo: Extract the token from the Authorization header
        const token = req.headers?.authorization?.split(" ")[1];

        // * Check if the token is missing
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
                // message: "No token provided!"
            })
        }

        // Todo: Verify the token using the secret key
        const verifyToken = jwt.verify(token, 'SECRET_KEY_TOKEN');

        // * Check if the token is valid
        if (!verifyToken) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        // * Attach the user information from the token to the request object
        req.user = { ...verifyToken };
        // log the user information
        console.log(req.user);
        // * Continue to the next middleware or route handler
        next();

    } catch (error) {
        return res.status(401).json(
            {
                message: 'Unauthorized',
                error: error.message
            }
        )
    }
};
