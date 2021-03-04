const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/login', authController.login);
router.get('/userDetails', isAuth, authController.userDetails);


module.exports = router;
