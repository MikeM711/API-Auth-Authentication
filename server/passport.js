const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const GooglePlusTokenStrategy = require('passport-google-plus-token')
const bCrypt = require('bcryptjs');
const { user } = require('./models')
const config = require('./config')

// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.JWT_SECRET
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

// GOOGLE OAUTH STRATEGY
passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: config.oauth.google.clientID,
  clientSecret: config.oauth.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
  console.log('accessToken', accessToken)
  console.log('refreshToken', refreshToken)
  console.log('profile', profile)

  // Check whether this current user exists in the database
  user.findOne({
    where: {
      googleId: profile.id
    }
  })
    .then(existingUser => {
      if (existingUser) {
        console.log('user already exists in database')
        /* This Google user is signing in
          Don't add them to the database, but still allow them to continue to the next middleware (the GoogleOAuth "controller"), to create a token
            That token will be used to access private routes
            When 2nd param of done() is defined, we are considered "successful"
        */
        return done(null, existingUser)
      }

      // If new account - put them in the DB
      const newUser = {
        method: 'google',
        googleId: profile.id,
        googleEmail: profile.emails[0].value
      }

      user.create(newUser)
        .then(DBuser => {
          console.log("user doesn't exist in the database")
          /* This Google user is signing up
            We will add the user to the database and allow them to continue to the next middleware (the GoogleOAuth "controller"), to create a token
            That token will be used to access private routes
            When 2nd param of done() is defined, we are considered "successful"
        */
          return done(null, DBuser)
        })
        .catch(err => {
          done(err, false, err.message)
        })

    })
    .catch(err => {
      done(err, false, err.message)
    })

}))

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