const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.post('/getAllbyUserId', isAuth, userController.getAllProjectUsersByUserId);
router.post('/getAll', isAuth, userController.getAllProjectUsers);
router.post('/add', isAuth, userController.addUser);
router.post('/edit', isAuth, userController.editUser);
router.post('/delete', isAuth, userController.deleteUser);
router.post('/employees', isAuth, userController.getUsers);
router.post('/projectUsers', isAuth, userController.getUserProjects);
router.patch('/removeUserFromProject', isAuth, userController.removeUserFromProject);
router.post('/addUserToProject', userController.addUserToProject);
router.get('/getManagementUsers', userController.getManagmentUsers);

module.exports = router;
