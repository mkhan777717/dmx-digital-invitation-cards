const mongoose = require("mongoose");

// Database connection logic here 
function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("Database connection successful")
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
        process.exit(1);
    }
}

module.exports = connectDB;