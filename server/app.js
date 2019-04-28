const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(cors());

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'))

module.exports = app;