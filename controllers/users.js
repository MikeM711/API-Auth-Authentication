const { user } = require('../models')

module.exports = {
  signUp: async (req, res, next) => {
    // All data: req.value.body

    const { email, password } = req.value.body

    const newUser = {
      email: email,
      password: password,
    }

    // Check to see if the user that is signing up has an email that is already in the database

    user.findOne({
      where: {
        email: newUser.email
      }
    })
      .then((DBUser) => {
        // If the email exists
        if (DBUser) {
          // status 403 = forbidden
          res.status(403).json({ error: "This email is taken" });
        } else {

          // If the email does not exist, create that user
          user.create(newUser)
            .then((user) => {
              console.log(user, "successfully added")
              // Future: Respond with token as well 
              res.status(200).json({ data: user.dataValues });
            })
            .catch((err) => {
              console.log(err, "not successfully added to the database")
              res.status(400).json({ err });
            })
        }
      })

  },

  signIn: async (req, res, next) => {
    // Generate Token

  },

  secret: async (req, res, next) => {

  },
}