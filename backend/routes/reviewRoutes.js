const express = require("express");
const db = require("../db"); // Import SQL database connection
const router = express.Router();

// ✅ 1. Get all reviews for a location
router.get("/:location_id", (req, res) => {
    const { location_id } = req.params;
    const query = "SELECT * FROM reviews WHERE location_id = ?";
    
    db.query(query, [location_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// ✅ 2. Add a new review (Updated version)
router.post("/", (req, res) => {
    console.log(req.body); // Debugging: See incoming data

    const { user_id, location_id, username, rating, text } = req.body; 

    if (!user_id || !location_id || !username || !rating || !text) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO reviews (user_id, location_id, username, rating, review_text) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [user_id, location_id, username, rating, text], (err, result) => {
        if (err) {
            console.error(err); // Debugging
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Review posted successfully!" });
    });
});

// ✅ 3. Delete a review
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM reviews WHERE id = ?";

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Review deleted successfully" });
    });
});

// ✅ 4. Get all reviews submitted by a user (For Dashboard)
router.get("/user/:user_id", (req, res) => {
    const { user_id } = req.params;
    const query = "SELECT * FROM reviews WHERE user_id = ?";

    db.query(query, [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;
