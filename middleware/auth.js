const jwt = require('jsonwebtoken')
const { jwtPrivateKey } = require('../config//keys.js');

// This middleware is authenticating the user using the jason web token
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send("Access denied. No token provided");

    // if the token is valid it will return the decoded payload
    try {
        const decoded = jwt.verify(token, jwtPrivateKey);
        req.user = decoded;
        next();
    }
    catch(ex) {
        res.status(400).send("Invalid token.");
    }


}

module.exports.auth = auth;