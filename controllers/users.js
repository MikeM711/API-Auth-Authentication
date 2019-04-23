module.exports = {
  signUp: async (req,res,next) => {
    console.log('UsersController.signUP() called!')
  },

  signIn: async (req,res,next) => {
    console.log('UsersController.signIn() called!')
  },

  secret: async (req,res,next) => {
    console.log('UsersController.secret() called!')
  },
}