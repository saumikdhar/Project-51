const Project = require('../models/project');


exports.getAllProjects= async(req,res,next)=>{
    const projects=await Project.findAll()
    console.log('projects',projects)
    res.status(200).json({
        success:true,
        data:projects
    })
}

exports.projectDetails= async(req,res,next)=>{
    const id=req.params.id;
    const projects=await Project.findOne({
        where:{
            id:id
        }
    })
    console.log('projects',projects)
    res.status(200).json({
        success:true,
        data:projects
    })
}

