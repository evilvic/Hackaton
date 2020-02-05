const Place = require('../models/Place')

exports.createGet = (req, res) => {
  res.render('private/create')
}

exports.createPost = async (req, res) => {
  const { name, address, latitude, longitude, placeType, image } = req.body
  const newPlace = {
    name,
    placeType,
    location: {
      address,
      coordinates: [longitude, latitude]
    },
    image
  }
  console.log(newPlace)
  const { _id } = await Place.create(newPlace)
  res.redirect(`/place/${_id}`)
}

exports.placeGet = async (req, res) => {
  const { id } = req.params
  const place = await Place.findById(id)
  res.render('place', place)
}

exports.profileGet = async (req, res) => {
  res.render('profile')
}