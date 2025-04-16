// server/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

// --- @route   POST api/auth/signup ---
// --- @desc    Register a new user ---
// --- @access  Public ---
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation (consider using express-validator for more robust validation)
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  if (password.length < 6) {
     return res.status(400).json({ msg: 'Password must be at least 6 characters long' });
  }

  try {
    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists with this email' });
    }

    // 2. Create new user instance
    user = new User({
      name,
      email,
      password, // Plain password for now
    });

    // 3. Hash password before saving
    const salt = await bcrypt.genSalt(10); // Generate salt
    user.password = await bcrypt.hash(password, salt); // Hash password

    // 4. Save user to database
    await user.save();

    // 5. Create JWT Payload
    const payload = {
      user: {
        id: user.id, // Mongoose adds 'id' automatically
      },
    };

    // 6. Sign JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' }, // Token expires in 5 hours (adjust as needed)
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token }); // Send token back to client
      }
    );

  } catch (err) {
    console.error('Signup Error:', err.message);
    res.status(500).json({ msg: 'Server error during signup' }); 
  }
});


// --- @route   POST api/auth/login ---
// --- @desc    Authenticate user & get token ---
// --- @access  Public ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please provide email and password' });
    }

    try {
        // 1. Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' }); // Don't specify if email or password is wrong
        }

        // 2. Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // 3. User matched, create JWT payload
        const payload = {
            user: {
                id: user.id,
            },
        };

        // 4. Sign JWT
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' }, // Same expiration as signup or configure differently
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // Send token back
            }
        );

    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).send('Server error during login');
    }
});


module.exports = router;