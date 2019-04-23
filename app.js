const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'))

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening at: ${PORT}`);
});