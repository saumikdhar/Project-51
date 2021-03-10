const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.post('/getAll', isAuth, userController.getAllProjectUsersByUserId);
router.post('/add', isAuth, userController.addUser);
router.post('/employees', isAuth, userController.getUsers);
router.post('/projectUsers', isAuth, userController.getUserProjects);
router.patch('/removeUserFromProject', isAuth, userController.removeUserFromProject);
router.post('/addUserToProject', isAuth, userController.addUserToProject);

module.exports = router;
