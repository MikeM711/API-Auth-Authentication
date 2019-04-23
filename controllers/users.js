module.exports = {
  signUp: async (req,res,next) => {
    // Email & Password
    // req.body.data
    console.log('contents of req.value.body', req.value.body)
    console.log('UsersController.signUP() called!')
  },

  signIn: async (req,res,next) => {
    // Generate Token
    console.log('UsersController.signIn() called!')
  },

  secret: async (req,res,next) => {
    console.log('UsersController.secret() called!')
  },
}