// =====================================================
// SkillMatch - Main Backend Server
// =====================================================

// Import required packages
const express = require("express");
const cors = require("cors");
const path = require("path");

// Import database
const connectDatabase = require("./database");

// Import routes
const authRoutes = require("./routes/authRoutes");
const skillRoutes = require("./routes/skillRoutes");
const jobRoutes = require("./routes/jobRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");


// =====================================================
// Create Express Application
// =====================================================

const app = express();


// =====================================================
// Server Configuration
// =====================================================

const PORT = process.env.PORT || 5000;


// =====================================================
// Connect to Database
// =====================================================

connectDatabase();


// =====================================================
// Middleware
// =====================================================

// Allow requests from frontend
app.use(cors());

// Read JSON data from requests
app.use(express.json());

// Read form data
app.use(express.urlencoded({ extended: true }));


// =====================================================
// Serve Frontend Files
// =====================================================

// This allows the backend to serve the frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));


// =====================================================
// API Routes
// =====================================================

// Authentication
app.use("/api/auth", authRoutes);

// Skills
app.use("/api/skills", skillRoutes);

// Jobs
app.use("/api/jobs", jobRoutes);

// Recommendations
app.use("/api/recommendations", recommendationRoutes);


// =====================================================
// Basic API Test
// =====================================================

app.get("/api", (req, res) => {

    res.json({
        success: true,
        message: "Welcome to SkillMatch API",
        version: "1.0.0"
    });

});


// =====================================================
// Home Route
// =====================================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "../frontend/index.html")
    );

});


// =====================================================
// 404 API Handler
// =====================================================

app.use("/api/*splat", (req, res) => {

    res.status(404).json({
        success: false,
        message: "API route not found"
    });

});


// =====================================================
// Global Error Handler
// =====================================================

app.use((err, req, res, next) => {

    console.error("Server Error:", err);

    res.status(500).json({
        success: false,
        message: "Something went wrong on the server"
    });

});


// =====================================================
// Start Server
// =====================================================

app.listen(PORT, () => {

    console.log("======================================");
    console.log("      SkillMatch Backend Server");
    console.log("======================================");

    console.log(`Server running on: http://localhost:${PORT}`);

    console.log(`Frontend: http://localhost:${PORT}`);

    console.log(`API: http://localhost:${PORT}/api`);

    console.log("======================================");

});