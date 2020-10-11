const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// GET Login Form
router.get('/login', userController.getLoginForm);

// POST Login Form
router.post('/login', userController.postLoginForm);

// GET User Details
router.get('/:id', userController.getUserFullname);

// // GET Signup Form
// router.get('/signup', userController.getSignupForm);

// // POST Signup Form
// router.post('/signup', userController.postSignupForm);

module.exports = router;
