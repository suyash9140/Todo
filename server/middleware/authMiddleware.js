const jwt = require("jsonwebtoken");
require("dotenv").config();


function authMiddleware(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
}

module.exports = authMiddleware;

