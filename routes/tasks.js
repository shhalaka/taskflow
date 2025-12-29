const express = require('express');
const router = express.Router();
const { Task, validateTask } = require('../models/task');

// GET all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find().sort('dateCreated');
    res.send(tasks);
});

// POST new task
router.post('/', async (req, res) => {
    const { error } = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let task = new Task({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        isCompleted: req.body.isCompleted,
        dueDate: req.body.dueDate
    });

    task = await task.save();   // VERY IMPORTANT
    res.send(task);
});

// GET by ID
router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');
    res.send(task);
});

// PUT update
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task) return res.status(404).send('Task not found');
    res.send(task);
});

module.exports = router;
