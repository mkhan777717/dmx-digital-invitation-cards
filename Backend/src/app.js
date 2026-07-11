// express app configuration here.
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const templateRoutes = require("")

const corsOption = {
    origin: process.env.CLIENT_URL,
    methods: ["GET","POST","PUT","PATCH"],
    allowedHeaders: ["Content-Type","Authorization"],
    credentials: true
}

// important packages
app.use(cors(corsOption))
app.use(express.json());
app.use(cookieParser());

// Routes 
app.use("/api",authRoutes);

// Templates Routes
app.use("/api",)


module.exports = app