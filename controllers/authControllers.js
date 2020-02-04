const User = require ('../models/User')

exports.signupView=(req, res)=>{
  res.render('auth/signup')

}

exports.signup= async(req, res)=>{
  const {name, email, lastName, username, password} =req.body
  if (name === '' || email === '' || lastName === '' || username === ''){
    res.render ('auth/signup', {
      message: 'Debes ingresar todos los campos'
    })
  }
  const useronDB = await User.findOne({email})
  if(useronDB !== null){
    res.render ('auth/signup', {message: 'El correo ya fue registrado'})
  }
  await User.register({
    email, 
    name,
    lastName,
    username
  }, password)
}

exports.loginView=(req, res)=>{
  res.render('auth/login', {message: req.flash ('error')})
}

exports.logout=(req, res)=>{
  req.logout()
  res.redirect('login')

}