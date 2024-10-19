const express = require('express');
const { createUser, getUserById } = require('../controllers/UserController');
const router = express.Router();

// POST /api/users - Create a new user
router.post('/', createUser);

// GET /api/users/:id - Get user by ID
router.get('/:id', getUserById);

module.exports = router;
