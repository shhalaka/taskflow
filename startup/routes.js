const tasks = require('../routes/tasks');
const auth = require('../routes/auth');

module.exports = function(app){
    app.use('/api/tasks', tasks);
    app.use('/api/auth', auth);

    // TEST ROUTE
    app.get('/', (req, res) => {
        res.send('API is working');
    });
};
