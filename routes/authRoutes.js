// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController'); // Import the controller
const router = express.Router();

// Route for user registration (POST /api/register)
router.post('/register', registerUser);

// Route for user login (POST /api/login)
router.post('/login', loginUser);

module.exports = router;
