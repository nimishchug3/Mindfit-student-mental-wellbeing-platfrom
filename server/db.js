require('dotenv').config(); // Load .env file

const mongoose = require("mongoose");

const mongoURL = process.env.MONGO_URL; // Retrieve MongoDB connection URL from .env file

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }); // url parser removed

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
