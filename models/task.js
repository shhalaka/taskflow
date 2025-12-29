const mongoose = require('mongoose');
const Joi = require('joi');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 255
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dueDate: Date
});

const Task = mongoose.model('Task', taskSchema);

function validateTask(task) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(255),
    priority: Joi.string().valid('low', 'medium', 'high'),
    isCompleted: Joi.boolean(),
    dueDate: Joi.date()
  });

  return schema.validate(task);
}

module.exports = { Task, validateTask };
