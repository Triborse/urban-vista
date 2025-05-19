const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db"); // Database connection
const authenticateToken = require("../middleware/authMiddleware"); // Import middleware
require("dotenv").config();

// Signup Route (Hashing Password)
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if user already exists
        const checkUserQuery = "SELECT * FROM users WHERE email = ?";
        db.query(checkUserQuery, [email], async (err, results) => {
            if (results.length > 0) {
                return res.status(400).json({ error: "User already exists" });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user into database
            const insertUserQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            db.query(insertUserQuery, [name, email, hashedPassword], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: "User registered successfully!" });
            });
        });
    } catch (error) {
        res.status(500).json({ error: "Signup failed" });
    }
});

// Login Route (Validating Hashed Password & Generating JWT)
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = results[0];

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful!", token });
    });
});

// ✅ Protected Route (Requires JWT)
router.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "Protected data accessed!", user: req.user });
});

module.exports = router;
