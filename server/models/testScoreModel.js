const mongoose = require('mongoose');

const testScoreSchema = new mongoose.Schema({
    // Reference to the user who took the test.
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Assuming you have a User model
    },
    // The topic the user spoke about.
    topic: {
        type: String,
        required: true,
    },
    // The duration of the recording in seconds.
    duration: {
        type: Number,
        required: true,
    },
    // The final transcription of the audio.
    transcription: {
        type: String,
        default: '',
    },
    // The status of the test processing.
    status: {
        type: String,
        required: true,
        enum: ['processing', 'processed', 'failed'], // Added 'failed' status
        default: 'processing'
    },
    // The following scores will be added later.
    fluency: {
        type: Number,
        default: 0
    },
    grammar: {
        type: Number,
        default: 0
    },
    vocabulary: {
        type: Number,
        default: 0
    },
    pronunciation: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// --- THIS IS THE CRUCIAL LINE ---
// We create the model and export it directly.
const TestScore = mongoose.model('TestScore', testScoreSchema);

module.exports = TestScore;