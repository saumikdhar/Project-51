//----------------------------------------------------------------------------------------------------------------------
// Import express, router ant the project controller
const express = require('express');
const {getAllProjects,projectDetails, getAllPendingProjects, getAllActiveProjects, projectAcceptUpdate, projectRejectUpdate} = require('../controllers/projects');
const router = express.Router();

//----------------------------------------------------------------------------------------------------------------------
// Route requests to the controller
router.get('/getAllProjects', getAllProjects)
router.get('/projectdetails/:id',projectDetails)
router.get('/getAllActiveProjects', getAllActiveProjects)
router.get('/getAllPendingProjects',getAllPendingProjects)
router.post('/accept/:id',projectAcceptUpdate)
router.post('/reject/:id',projectRejectUpdate)

// Export router
module.exports = router;
