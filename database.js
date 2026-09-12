// ==========================================
// SkillMatch - Database Connection
// ==========================================

// Import Mongoose
const mongoose = require("mongoose");


// ==========================================
// MONGODB CONNECTION
// ==========================================

// MongoDB connection URL
// For local MongoDB:
const MONGO_URI =
    process.env.MONGO_URI ||
    "mongodb://127.0.0.1:27017/skillmatch";


// ==========================================
// CONNECT DATABASE FUNCTION
// ==========================================

async function connectDatabase() {

    try {

        await mongoose.connect(MONGO_URI);

        console.log("--------------------------------------");
        console.log("MongoDB connected successfully");
        console.log("Database: SkillMatch");
        console.log("--------------------------------------");

    } catch (error) {

        console.error("--------------------------------------");
        console.error("MongoDB connection failed");
        console.error(error.message);
        console.error("--------------------------------------");

        // Stop the server if database connection fails
        process.exit(1);

    }

}


// ==========================================
// DATABASE CONNECTION EVENTS
// ==========================================

mongoose.connection.on("disconnected", () => {

    console.log("MongoDB disconnected");

});


mongoose.connection.on("reconnected", () => {

    console.log("MongoDB reconnected");

});


// ==========================================
// EXPORT FUNCTION
// ==========================================

module.exports = connectDatabase;