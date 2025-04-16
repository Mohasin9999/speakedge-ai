// server/server.js
require('dotenv').config(); // Load environment variables
console.log("✅ .env loaded");
console.log("🔐 MONGO_URI:", process.env.MONGO_URI ? "Exists" : "Missing");
console.log("🔐 JWT_SECRET:", process.env.JWT_SECRET ? "Exists" : "Missing");// Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // We'll create this next

// Connect to Database
connectDB();

const app = express();

// Init Middleware
app.use(cors()); // Enable CORS for all origins (adjust for production)
app.use(express.json({ extended: false })); // Allow express to accept JSON body data

// Define Routes
app.get('/', (req, res) => res.send('API Running')); // Simple test route
app.use('/api/auth', require('./routes/auth')); // We'll create this route file

const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));