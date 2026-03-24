const express = require('express');
const router = express.Router();
const { Task, validateTask } = require('../models/task');
const auth = require('../middleware/auth');

// GET all tasks
router.get('/', auth, async (req, res) => {
    const tasks = await Task.find({ createdBy: req.user._id }).sort({ dateCreated: -1 });
    res.send(tasks);
});

// POST new task
router.post('/', auth, async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let task = new Task({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
    createdBy: req.user._id
  });

  task = await task.save();
  res.send(task);
});

// GET by ID
router.get('/:id', auth, async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');
    res.send(task);
});

// PUT update
router.put('/:id', auth, async (req, res) => {
    const { error } = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const task = await Task.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            isCompleted: req.body.isCompleted,
            dueDate: req.body.dueDate
        },
        { new: true }
    );

    if (!task) return res.status(404).send('Task not found');
    res.send(task);
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task) return res.status(404).send('Task not found');
    res.send(task);
});

module.exports = router;
