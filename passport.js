const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt')
const { user } = require('./models')

const { JWT_SECRET } = require('./config')

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
      done(error,false);
    })
}));