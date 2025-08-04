const Review = require('../models/Review');

const addReview = async (req, res) => {
    try {
        const { name, image, review, rating } = req.body;

        const newReview = new Review({
            name,
            image,
            review,
            rating
        });

        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Server error while adding review.' });
    }
};


const getReviews = async (req, res) => {
    try {
        // Fetch reviews based on rating criteria
        const fiveStarReviews = await Review.find({ rating: 5 }).limit(4);
        const fourAndHalfStarReviews = await Review.find({ rating: 4.5 }).limit(2);
        const fourStarReviews = await Review.find({ rating: 4 }).limit(1);

        // Combine the reviews into a single array
        const reviews = [
            ...fiveStarReviews,
            ...fourAndHalfStarReviews,
            ...fourStarReviews
        ];

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Server error while fetching reviews.' });
    }
};

module.exports = {
    addReview,
    getReviews
};
