const express=require('express')
const router = express.Router();
const {getScoreboard}=require('./../controllers/scoreboards')
router.get('/getScoreBoard/:id',getScoreboard)
module.exports = router;