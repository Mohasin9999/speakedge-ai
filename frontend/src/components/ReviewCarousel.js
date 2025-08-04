import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Helper component for rendering stars
const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center justify-center">
            {'★'.repeat(fullStars).split('').map((star, i) => <span key={`full-${i}`} className="text-yellow-400 text-2xl">{star}</span>)}
            {halfStar && <span className="text-yellow-400 text-2xl">½</span>}
            {'☆'.repeat(emptyStars).split('').map((star, i) => <span key={`empty-${i}`} className="text-gray-300 text-2xl">{star}</span>)}
        </div>
    );
};

// Review Carousel Component
const ReviewCarousel = () => {
    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);
    const carouselRef = useRef(null);

    const getCardWidth = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 768) return 100; // 1 card on mobile
            if (window.innerWidth < 1024) return 50; // 2 cards on tablet
        }
        return 100 / 3; // 3 cards on desktop
    };
    const [cardWidth, setCardWidth] = useState(getCardWidth());

    useEffect(() => {
        const handleResize = () => setCardWidth(getCardWidth());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const API_URL = 'http://localhost:5000/api/reviews';

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(API_URL);
                if (response.data.length > 0) {
                    setReviews([...response.data, ...response.data]);
                }
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            }
        };
        fetchReviews();
    }, []);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        if (reviews.length === 0) return;

        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            const newIndex = currentIndex + 1;
            if (newIndex >= reviews.length / 2) {
                if (carouselRef.current) {
                    carouselRef.current.style.transition = 'none';
                    setCurrentIndex(0);
                    setTimeout(() => {
                        if (carouselRef.current) {
                           carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
                        }
                    }, 50);
                }
            } else {
                setCurrentIndex(newIndex);
            }
        }, 5000);

        return () => {
            resetTimeout();
        };
    }, [currentIndex, reviews.length]);
    
    const handleArrowClick = (direction) => {
        if (reviews.length === 0) return;
        let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        if (newIndex < 0) {
            newIndex = (reviews.length / 2) - 1;
        } else if (newIndex >= reviews.length / 2) {
            newIndex = 0;
        }
        setCurrentIndex(newIndex);
    };

    if (reviews.length === 0) {
        return (
            <div className="text-center p-8">
                <p className="text-gray-500">Loading testimonials...</p>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
            <div
                ref={carouselRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * cardWidth}%)` }}
            >
                {reviews.map((review, index) => (
                    <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4" key={index}>
                         <div className="bg-white dark:bg-dark-bg h-full p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2">
                            <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-blue-200 dark:border-brand-blue shadow-md">
                                <img 
                                    src={review.image} 
                                    alt={`User ${review.name}`} 
                                    className="w-full h-full object-cover" 
                                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/80x80/EBF4FF/7F9CF5?text=User'; }}
                                />
                            </div>
                            <p className="text-gray-700 text-base italic mb-4 flex-grow dark:text-gray-300">"{review.review}"</p>
                            <p className="font-semibold text-brand-blue dark:text-green-400 mb-2">{review.name}</p>
                            <StarRating rating={review.rating} />
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={() => handleArrowClick('prev')} className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-4 z-10 bg-white/80 dark:bg-dark-bg/80 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-white">
                &lt;
            </button>
            <button onClick={() => handleArrowClick('next')} className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-4 z-10 bg-white/80 dark:bg-dark-bg/80 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-white">
                &gt;
            </button>
        </div>
    );
};

export default ReviewCarousel;
