const BusinessCase = require("../models/business-case")


exports.getBusinessCase= async(req,res,next)=>{
    const projectId=req.params.id
    const businessCase=await BusinessCase.findAll({
        where:{
            projectId :projectId
        }
    })
console.log('businessCase',businessCase)
    res.status(200).json({
        success:true,
        data:businessCase
    })
}
