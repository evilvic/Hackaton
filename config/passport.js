const User = require('../models/User')
const passport = require('passport')
const googleStrategy = require('passport-google-oauth20').Strategy
// const facebookStrategy = require('passport-facebook').Strategy

passport.use(User.createStrategy())

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user))
})

// Google
passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleID: profile.id })
      if (user) {
        await user.save()
        return done(null, user)
      }
      const newUser = await User.create({
        googleID: profile.id,
        name: profile.displayName,
        email: profile._json.email
      });
      done(null, newUser);
    }
  )
)
/*
passport.use(
  new FacebookStrategy(
    {
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));
*/
module.exports = passport