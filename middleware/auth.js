const jwt = require('jsonwebtoken');// Jwt token middleware creates a token for the user and send it to the client
require('dotenv').config(); // Dotenv is a module that allows us to read environment variables from a .env file

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_PWD);
        const userId = decodedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    }
    catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};