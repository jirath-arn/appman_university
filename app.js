require('dotenv').config();

const express = require('express');
const app = express();

const studentsRoute = require('./src/routes/students');
const universitiesRoute = require('./src/routes/universities');

app.use(express.json());
app.use('/students', studentsRoute);
app.use('/universities', universitiesRoute);
app.use((req, res) => {
    return res.status(404).send({
        message: 'Not found.'
    });
});

module.exports = app;
