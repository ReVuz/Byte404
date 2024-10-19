const Task = require('../models/Task');

// Create a new task for a user
exports.createTask = async (req, res) => {
  const { task_id, user_id, task_description, task_type, location } = req.body;

  try {
    const task = new Task({
      task_id,
      user_id,
      task_description,
      task_type,
      location
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task', details: error.message });
  }
};

// Get tasks by user ID
exports.getTasksByUserId = async (req, res) => {
  const user_id = req.params.id;

  try {
    const tasks = await Task.find({ user_id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve tasks' });
  }
};

// Mark a task as complete
exports.completeTask = async (req, res) => {
  const { task_id } = req.params;

  try {
    const task = await Task.findOne({ task_id });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.status = 'completed';
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to complete task' });
  }
};
