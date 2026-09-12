const express = require('express');
const Player = require('../models/Player');
const router = express.Router();

// 선수 목록 조회 API
router.get('/players', async (req, res) => {
    try {
    const players = await Player.find();
    res.json(players);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});

// 선수 추가 API
router.post('/players', async (req, res) => {
    const { name, team, position, dominantFoot } = req.body;

    const newPlayer = new Player({ name, team, position, dominantFoot });
    try {
    await newPlayer.save();
    res.status(201).json(newPlayer);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
});

module.exports = router;