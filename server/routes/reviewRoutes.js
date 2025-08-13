// server/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();

// A dummy route that successfully returns an empty list of reviews
router.get('/', (req, res) => {
    console.log('Dummy /api/reviews endpoint was called.');
    res.status(200).json([]); // Send back an empty array
});

module.exports = router;