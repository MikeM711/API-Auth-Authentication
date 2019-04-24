const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const bCrypt = require('bcryptjs');
const { user } = require('./models')
const { JWT_SECRET } = require('./config')

// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
}, (payload, done) => {

  // Find the users specified in token
  user.findOne({
    where: {
      id: payload.sub
    }
  })
    .then(DBuser => {
      // if user doesn't exist, handle it
      if (!DBuser) {
        return done(null, false);
      }

      // Otherwise, return the user
      if (DBuser) {
        return done(null, user);
      }
    })
    .catch(err => {
      console.log('Error: ', err)
      done(error, false);
    })
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {

  // compare plain text password with hashed password
  var isValidPassword = function (userpass, password) {
    return bCrypt.compareSync(password, userpass);
  }

  // Find the user, given the email
  user.findOne({
    where: {
      email: email
    }
  })
    .then(currUser => {
      // If user doesn't exist, handle it
      if (!currUser) {
        return done(null, false)
      }

      // Check if the password is correct

      // If password is not correct, handle it
      if (!isValidPassword(currUser.password, password)) {
        // no errors, but you won't get the user object, because the password isn't correct
        return done(null, false);
      }

      // Otherwise, return the user that the client has asked for
      done(null, currUser)

    })
    .catch(err => {
      console.log('User not found in DB', err)
      done(err, false)
    })

}))