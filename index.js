const app = require('./server/app');
const models = require('./server/models')

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

// refactored code for easier test and feature scale