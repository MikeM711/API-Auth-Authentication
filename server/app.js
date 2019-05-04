const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const dotenv = require('dotenv').config()

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

// Allowed origins
const corsOptions = {
  origin: `${process.env.ALLOWED_ORIGINS}`,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'))

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

module.exports = app;