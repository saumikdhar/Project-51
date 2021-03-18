const express = require('express');
const router = express.Router();
const scoreboard = require('./../controllers/scoreboards');
router.post('/getScoreBoard', scoreboard.getScoreboard);
module.exports = router;
