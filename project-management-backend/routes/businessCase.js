//----------------------------------------------------------------------------------------------------------------------
// Import express, router ant the business case controller
const express = require('express');
const router = express.Router();
const { getBusinessCase } = require('./../controllers/businessCase');

const createBusinessCase = require('./../controllers/addBusinessCase');

//----------------------------------------------------------------------------------------------------------------------
// Route requests to the controller
router.get('/getBusinessCase/:id', getBusinessCase);
router.post('/updateBusinessCase/:id', createBusinessCase.updateBusinessCase);
router.post('/addBusinessCase/:id', createBusinessCase.addBusinessCase);

// Export router
module.exports = router;
