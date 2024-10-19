const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
  const { user_id, username, email } = req.body;

  try {
    const user = new User({ user_id, username, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user', details: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  const user_id = req.params.id;

  try {
    const user = await User.findOne({ user_id });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve user' });
  }
};
