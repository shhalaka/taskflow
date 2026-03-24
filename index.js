const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

require('./startup/routes')(app);

mongoose.connect('mongodb://localhost/taskflow')
    .then(() => console.log('Connected to mongodb...'))
    .catch(err => console.log('Could not connect to mongodb....', err));

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));
