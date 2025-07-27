const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// Save a score
router.post('/score', async (req, res) => {
    try {
        const { username, score } = req.body;
        const newScore = new Score({ username, score });
        await newScore.save();
        res.json({ message: 'Score saved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get top 10 scores
router.get('/scores', async (req, res) => {
    try {
        const scores = await Score.find().sort({ score: -1 }).limit(10);
        res.json(scores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
