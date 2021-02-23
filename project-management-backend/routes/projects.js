const express = require('express');
const {getAllProjects,projectDetails} = require('../controllers/projects');

const router = express.Router();
router.get('/getAllProjects', getAllProjects)
router.get('/projectdetails/:id',projectDetails)
module.exports = router;
