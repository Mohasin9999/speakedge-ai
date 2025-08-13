const express = require('express');
const multer = require('multer');
const path = require('path');

// Ensure this line imports both functions
const { analyzeAudio, getTestScore } = require('../controllers/testScoreController');

const router = express.Router();

// ... (multer configuration) ...
const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, 'AudioFiles/'); },
    filename: function (req, file, cb) {
        const topic = req.body.topic;
        const topicName = (topic && typeof topic === 'string') 
            ? topic.replace(/\s+/g, '-').toLowerCase() 
            : 'no-topic';
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${topicName}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

// Define the API routes
router.post('/analyze', upload.single('audio'), analyzeAudio);
router.get('/:id', getTestScore); // This will now work correctly

module.exports = router;