require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); // Import database connection

const authRoutes = require("./routes/authRoutes"); // Import authentication routes
const reviewRoutes = require("./routes/reviewRoutes"); // Import review routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Default route
app.get("/", (req, res) => {
    res.send("Urban Vista Backend is Running");
});

// Route to test database connection
app.get("/test-db", (req, res) => {
    db.query("SELECT 1 + 1 AS result", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Database connected successfully!", result: results[0] });
    });
});

// Use authentication routes
app.use("/api/auth", authRoutes);

// Use review routes (✅ Move this ABOVE app.listen())
app.use("/api/reviews", reviewRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
