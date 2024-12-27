// src/users/users.routes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// POST /register - Register a new user
router.post('/register', UserController.register);

// POST /login - Login an existing user
router.post('/login', UserController.login);

module.exports = router;
