const express = require('express');
const { createTask, getTasksByUserId, completeTask } = require('../controllers/TaskController');
const router = express.Router();

// POST /api/tasks - Create a new task
router.post('/', createTask);

// GET /api/tasks/user/:id - Get tasks for a specific user
router.get('/user/:id', getTasksByUserId);

// PATCH /api/tasks/:task_id/complete - Mark task as complete
router.patch('/:task_id/complete', completeTask);

module.exports = router;
