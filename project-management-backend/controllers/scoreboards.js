const Project = require("../models/project");
const Scoreboard = require("../models/scoreboard");

exports.getScoreboard= async(req,res,next)=>{
    const projectId=req.params.id
    const scoreboard=await Scoreboard.findAll({
        where:{
            projectId :projectId
        }
    })
console.log('scoreboard',scoreboard)
    res.status(200).json({
        success:true,
        data:scoreboard
    })
}