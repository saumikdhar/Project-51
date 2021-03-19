const express = require('express');
const router = express.Router();
const scoreboard = require('./../controllers/scoreboards');
router.post('/getScoreBoard', scoreboard.getScoreboard);
router.patch('/saveRiskNarrative', scoreboard.saveRiskNarrative);
router.patch('/saveObjectiveNarrative', scoreboard.saveObjectiveNarrative);
router.patch('/saveActionNarrative', scoreboard.saveActionNarrative);

module.exports = router;
