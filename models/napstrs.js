var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/napstr')

var napstrSchema = mongoose.Schema(
  {name: String,
  username: String,
  profilePic: String,
  aboutMe: String,
  address: String,
  availability: String,
  rating: Integer,
  geolocation: {lat: String, lng: String},
  napPreferences: [String, String],
  envPreferences: [String, String],
  reviews: [{user: String,
            content: String}],
  requests: [{name: String, 
            pending: Boolean, 
            confirmed: Boolean, 
            denied: Boolean, 
            date: String}]
})

module.exports = mongoose.model('napstrs', napstrSchema)