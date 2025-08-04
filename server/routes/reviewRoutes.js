const express = require('express');
const router = express.Router();
const { addReview, getReviews } = require('../controllers/reviewController');

// Route to add a new review
router.post('/', addReview);

// Route to get the curated list of reviews
router.get('/', getReviews);

module.exports = router;
