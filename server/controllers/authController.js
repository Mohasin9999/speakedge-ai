// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      // Send successful response with token and user info
      res.status(201).json({
        msg: 'User registered successfully!',
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo, // Include photo in response
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ msg: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error during registration' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check if user exists by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare entered password with hashed password
    if (await user.matchPassword(password)) {
      // Send successful response with token and user info
      res.json({
        msg: 'Login successful!',
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo, // Include photo in response
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ msg: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error during login' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};