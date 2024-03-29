const isAuth = require('../middleware/is-auth');

const express = require('express');
const {
  projectDetails,
  getAllPendingProjects,
  getAllActiveProjects,
  getAllArchivedProjects,
  projectAcceptUpdate,
  projectRejectUpdate,
  deleteProject,
  getMyProjects,
  archiveProject,
  editProject,
  getSearchedProducts
} = require('../controllers/projects');
const addProjectController = require('../controllers/addProject');
const router = express.Router();

// Route requests to the controller
router.get('/projectdetails/:id', projectDetails);
router.get('/deleteProject/:id', deleteProject);
router.get('/archiveProject/:id', archiveProject);
router.post('/getMyProjects', getMyProjects);
router.post('/getSearchedProducts', getSearchedProducts);
router.get('/getAllActiveProjects', getAllActiveProjects);
router.get('/getAllPendingProjects', getAllPendingProjects);
router.get('/getAllArchivedProjects', getAllArchivedProjects);
router.post('/accept/:id', projectAcceptUpdate);
router.post('/reject/:id', projectRejectUpdate);
router.get('/questionnaire', addProjectController.getQuestionnaire);
router.post('/createProject', addProjectController.createProject);
router.post('/editProject/:id', isAuth, editProject);

// Export router
module.exports = router;
