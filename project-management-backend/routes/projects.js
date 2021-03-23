const express = require('express');
const {
  projectDetails,
  getAllPendingProjects,
  getAllActiveProjects,
  projectAcceptUpdate,
  projectRejectUpdate,
  deleteProject,
  getMyProjects,
  archiveProject
} = require('../controllers/projects');
const addProjectController = require('../controllers/addProject');
const router = express.Router();

// Route requests to the controller
router.get('/projectdetails/:id', projectDetails);
router.get('/deleteProject/:id', deleteProject);
router.get('/archiveProject/:id', archiveProject);
router.post('/getMyProjects', getMyProjects);
router.get('/getAllActiveProjects', getAllActiveProjects);
router.get('/getAllPendingProjects', getAllPendingProjects);
router.post('/accept/:id', projectAcceptUpdate);
router.post('/reject/:id', projectRejectUpdate);
router.get('/questionnaire', addProjectController.getQuestionnaire);
router.post('/createProject', addProjectController.createProject);

// Export router
module.exports = router;
