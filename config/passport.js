const User = require('../models/User')
const passport = require('passport')
const googleStrategy = require('passport-google-oauth20').Strategy
const facebookStrategy = require('passport-facebook').Strategy

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
    }
  )
)