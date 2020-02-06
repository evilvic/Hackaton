const User = require ('../models/User')
const Place = require('../models/Place')

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

exports.profileView = (req, res) => {
  res.render('private/profile')
}

exports.logout=(req, res)=>{
  req.logout()
  res.redirect('login')

}

exports.preferencesView = (req, res) =>{
  res.render('private/preferences')
}

exports.suggestionsView = (req, res) => {
  res.render('private/suggestions')
}

exports.suggestionsPost = async (req, res) => {
  const {
    Restaurante,
    Cafetería,
    Bar,
    Cine,
    Museo,
    Sitio_Histórico,
    Parque,
    Gimnasio,
    Metro,
    Metrobus,
    Ecobici,
    Estacionamiento
   } = req.body

   const placesArr = []


   if (Restaurante === 'true') {
      const recomendedRestaurants = await Place.find({placeType: "Restaurante"})
      placesArr.push(recomendedRestaurants[Math.floor(Math.random() * recomendedRestaurants.length)])
   }
   if (Cafetería === 'true') {
    const recomendedCafe = await Place.find({placeType: "Cafetería"})
    placesArr.push(recomendedCafe[Math.floor(Math.random() * recomendedCafe.length)])
  }
  if (Bar === 'true') {
    const recomendedBar = await Place.find({placeType: "Bar"})
    placesArr.push(recomendedBar[Math.floor(Math.random() * recomendedBar.length)])
  }
  if (Cine === 'true') {
    const recomendedCine = await Place.find({placeType: "Cine"})
    placesArr.push(recomendedCine[Math.floor(Math.random() * recomendedCine.length)])
  }
  if (Museo === 'true') {
    const recomendedMuseo = await Place.find({placeType: "Museo"})
    placesArr.push(recomendedMuseo[Math.floor(Math.random() * recomendedMuseo.length)])
  }
  if (Sitio_Histórico === 'true') {
    const recomendedHistorico = await Place.find({placeType: "Sitio_Histórico"})
    placesArr.push(recomendedHistorico[Math.floor(Math.random() * recomendedHistorico.length)])
  }
  if (Parque === 'true') {
    const recomendedParque = await Place.find({placeType: "Parque"})
    placesArr.push(recomendedParque[Math.floor(Math.random() * recomendedParque.length)])
  }
  if (Gimnasio === 'true') {
    const recomendedGimnasio = await Place.find({placeType: "Gimnasio"})
    placesArr.push(recomendedGimnasio[Math.floor(Math.random() * recomendedGimnasio.length)])
  }
  if (Metro === 'true') {
    const recomendedMetro = await Place.find({placeType: "Metro"})
    placesArr.push(recomendedMetro[Math.floor(Math.random() * recomendedMetro.length)])
  }
  if (Metrobus === 'true') {
    const recomendedMetrobus = await Place.find({placeType: "Metrobus"})
    placesArr.push(recomendedMetrobus[Math.floor(Math.random() * recomendedMetrobus.length)])
  }
  if (Ecobici === 'true') {
    const recomendedEcobici = await Place.find({placeType: "Ecobici"})
    placesArr.push(recomendedEcobici[Math.floor(Math.random() * recomendedEcobici.length)])
  }
  if (Estacionamiento === 'true') {
    const recomendedEsta = await Place.find({placeType: "Estacionamiento"})
    placesArr.push(recomendedEsta[Math.floor(Math.random() * recomendedEsta.length)])
  }

   console.log(placesArr)

   

  res.render('private/suggestions', {placesArr})
}