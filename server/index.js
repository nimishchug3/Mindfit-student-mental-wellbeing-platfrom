const db = require("./db");
const express = require("express");
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cloudinary = require('cloudinary').v2;
const cookies = require("cookie-parser");
const backendroutes = require("./routes/backend.routes");
const initializeSocketServer = require("./socketServer"); // Import initializeSocketServer
const http = require("http"); // Import HTTP module for creating server

const app = express();
const server = http.createServer(app); // Create HTTP server

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // Make sure to enable credentials
}));

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 100000, limit: "50mb" }));
app.use(cookies());

const port = 8000;

app.use('/api/v1', backendroutes);

server.listen(port, () => {
    console.log(`Server started on running port ${port}`);
});

// Initialize Socket.IO server
initializeSocketServer(server);
