const express = require('express');
const tasks = require('../routes/tasks');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/tasks', tasks);

    // TEST ROUTE
    app.get('/', (req, res) => {
        res.send('API is working');
    });
};
