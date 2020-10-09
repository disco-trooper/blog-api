const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET Login Form
router.get('/login', userController.getLoginForm);

// POST Login Form
router.post('/login', userController.postLoginForm);

// GET Signup Form
router.get('/signup', userController.getSignupForm);

// POST Signup Form
router.post('/signup', userController.postSignupForm);

module.exports = router;
