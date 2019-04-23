const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const models = require('./models')

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'))

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, (err) => {
  if(!err) {
    models.sequelize.sync()
     .then(() => {
       console.log('Database is running')
     })
     .catch((err) => {
       console.log(err, 'Something went wrong with the Database update')
     })

     console.log(`Server listening at: ${PORT}`);

  } else {
    console.log(err)
  }
  
});