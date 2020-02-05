const {model, Schema} = require('mongoose')

const placeSchema = new Schema (
  {
    name: String,
    location: {
      address: {
        type: String
      },
      coordinates: {
        type: [Number]
      }
    },
    placeType: {
      type: String,
      enum: ['Restaurante', 'Cafetería', 'Bar', 'Cine', 'Museo', 'Sitio_Histórico', 'Parque', 'Gimnasio',
            'Metro', 'Metrobus', 'Ecobici', 'Estacionamiento']
    },
    image: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Place', placeSchema)