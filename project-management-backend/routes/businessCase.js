//----------------------------------------------------------------------------------------------------------------------
// Import express, router ant the business case controller
const express=require('express')
const router = express.Router();
const {getBusinessCase}=require('./../controllers/businessCase')

//----------------------------------------------------------------------------------------------------------------------
// Route requests to the controller
router.get('/getBusinessCase/:id',getBusinessCase)

// Export router
module.exports = router;
