const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const connectDB = require('./config/db'); 

// --- Route Imports (No Duplicates) ---
const authRoutes = require('./routes/authRoutes'); 
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const testScoreRoutes = require('./routes/testScoreRoutes');
// const reviewRoutes = require('./routes/reviewRoutes'); // <-- REMOVED: This was the duplicate declaration causing the crash.

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// --- Middleware ---
// This order is correct. CORS first.
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Basic route for testing server
app.get('/', (req, res) => {
  res.send('API is running...');
});

// --- Mount Routes (No Duplicates) ---
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/test-scores', testScoreRoutes);


// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});