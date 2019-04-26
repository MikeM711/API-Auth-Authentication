const app = require('./app');
const models = require('./models')

// Start the server
// PORT changed to 5000, because create-react-app listens to 3000
const PORT = process.env.PORT || 5000
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