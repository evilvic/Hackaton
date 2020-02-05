const { Router } = require('express')
const router = Router()

const passport = require('../config/passport')

const {
  signupView,
  signup,
  loginView,
  logout,
  profileView
}=require('../controllers/authControllers')

router
  .get ('/signup', signupView)
  .post('/signup', signup)
  .get('/login', loginView)
  .post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
  )
  .get('/profile', profileView)


// GOOGLE
router
  .get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ]
    })
  )
  .get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/profile",
      failureRedirect: "/login"
    })
  )

router.get('/logout', logout)



 module.exports = router