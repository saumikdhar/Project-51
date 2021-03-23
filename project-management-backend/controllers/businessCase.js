//----------------------------------------------------------------------------------------------------------------------
// Import business case model
const BusinessCase = require("../models/business-case")

//----------------------------------------------------------------------------------------------------------------------
// Controller to retrieve business case by project id foreign key id
exports.getBusinessCase = async (req,res,next) => {

    // Tries to pull business case information from the database returning as a JSON
    try {
        const projectId = req.params.id
        const businessCase = await BusinessCase.findAll({ where:{ projectId : projectId } })
        res.status(200).json({
            success : true,
            data : businessCase
        })
    }

    // On error return error message
    catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        res.status(error.statusCode).json({ error: error });
    }
}
