const express = require("express");
const router = express.Router();
const db = require("../db");
const authenticateUser = require("../middleware/authMiddleware");

// Add a place to wishlist
router.post("/", authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const { place_id } = req.body;

        const query = "INSERT INTO wishlist (user_id, place_id) VALUES (?, ?)";
        await db.query(query, [userId, place_id]);

        res.json({ message: "Added to wishlist" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get user's wishlist
router.get("/", authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const query = `
            SELECT places.id, places.name, places.image 
            FROM wishlist 
            JOIN places ON wishlist.place_id = places.id 
            WHERE wishlist.user_id = ?`;
        const [wishlist] = await db.query(query, [userId]);

        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
