const express = require("express");
const router = express.Router();
const db = require("../db"); // Import your database connection
const authenticateUser = require("../middleware/authMiddleware"); // Ensure JWT authentication

// Get user profile
router.get("/profile", authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from JWT token
        const query = "SELECT id, name, email FROM users WHERE id = ?";
        const [user] = await db.query(query, [userId]);

        if (!user.length) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user[0]);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
