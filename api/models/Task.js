const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task_id: { type: String, required: true, unique: true },  // unique identifier for the task
  user_id: { type: String, required: true, ref: 'User' },   // reference to the Users collection
  task_description: { type: String, required: true },
  task_type: { type: String, enum: ['location-specific', 'generic'], required: true },
  location: {
    latitude: { type: Number },
    longitude: { type: Number }
  },  // optional: only for location-specific tasks
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Pre-save middleware to update the updated_at field
taskSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Task', taskSchema);
