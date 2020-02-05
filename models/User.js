const {model, Schema} = require('mongoose');
const PLM = require('passport-local-mongoose')

const userSchema = new Schema (
  {
    email: String,
    name: String,
    lastName: String,
    googleID: String,
    username: String,
    preferences: [String]
  }
)
userSchema.plugin(PLM,{usernameField: 'email'})

module.exports = model('User', userSchema)