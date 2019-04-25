const JWT = require('jsonwebtoken');
const bCrypt = require('bcryptjs');
const { user } = require('../models')
const { JWT_SECRET } = require('../config/index.js')

signToken = user => {
  return JWT.sign({
    iss: 'Michael',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    // All data: req.value.body

    const { email, password } = req.value.body

    // Generate salt and hash
    var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

    var userPassword = generateHash(password);

    const newUser = {
      email: email,
      password: userPassword,
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
          // For a user that already exists, I think HTTP status code of 409(Conflict) matches better
          res.status(403).json({ error: "This email is taken" });
        } else {

          // If the email does not exist, create that user
          user.create(newUser)
            .then((user) => {
              console.log(user, "successfully added")

              // Generate the token
              const token = signToken(user)
              res.status(200).json({ token: token })

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
    console.log(req.user)
    console.log('complete')
    const token = signToken(req.user)
    res.status(200).json({ token })
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here!')
    res.json({ secret: "resource" })

  },
}