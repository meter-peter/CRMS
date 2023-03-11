const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// route for registering a new user
router.post('/register', registerUser);

// route for logging in an existing user
router.post('/login', loginUser);

module.exports = router;