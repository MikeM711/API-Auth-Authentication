const { user } = require('../models')

module.exports = {
  signUp: async (req,res,next) => {
    // Email & Password
    // req.body.data
    console.log('contents of req.value.body', req.value.body)
    console.log('UsersController.signUP() called!')

    const { email, password } = req.value.body

    const newUser = {
      email: email,
      password: password,
    }

    user.create(newUser)
      .then((user) => {
        console.log(user, "successfully added")
        res.status(200).json({ data: user.dataValues });
      })
      .catch((err) => {
        console.log(err, "not successfully added to the database")
        res.status(400).json({ error });
      })

  },

  signIn: async (req,res,next) => {
    // Generate Token
    console.log('UsersController.signIn() called!')
  },

  secret: async (req,res,next) => {
    console.log('UsersController.secret() called!')
  },
}