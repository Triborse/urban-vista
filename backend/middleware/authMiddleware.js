const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Token is missing" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Forbidden: Invalid token" });
        }
        req.user = decoded; // Save decoded user data (contains userID and username)
        next(); // Proceed to next middleware
    });
};

module.exports = authenticateToken;
