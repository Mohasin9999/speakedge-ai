// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const connectDB = require('./config/db'); // Import database connection
const authRoutes = require('./routes/authRoutes'); // Import auth routes

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins (adjust for production)
app.use(express.json()); // Body parser for JSON data

// Basic route for testing server
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount auth routes
app.use('/api/auth', authRoutes);

// Define the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});