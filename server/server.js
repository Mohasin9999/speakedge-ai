const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/authRoutes'); 
const reviewRoutes = require('./routes/reviewRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Basic route for testing server
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount auth routes
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);


const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});