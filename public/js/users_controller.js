angular.module('Napstr').controller('UsersController', UsersController);


var displayPosition = function(position) {
  console.log('Latitude: ' + position.coords.latitude + ', Longitude: ' + position.coords.longitude);
}

var displayError = function(err){
  var errors = {
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  console.log('Error: ' + errors[err.code]);
}

if (navigator.geolocation) {
  console.log('navigator!!!');
  navigator.geolocation.getCurrentPosition(
    displayPosition, displayError, {enableHighAccuracy: true, timeout: 5000});
} else {
  alert('Geolocation is not supported by this browser')
}



function UsersController(){

  var ctrl = this;

  ctrl.all = 
        [{
          name: 'Dana',
          username: 'DanaMC18',
          profilePic: 'image_url',
          aboutMe: 'Looking for a dude to cuddle with',
          availability: 'M - F 12:30pm - 1:30pm',
          geolocation: {},
          napPreferences: ['little spoon'],
          evnPreferences: ['dark', 'quiet'],
          reviews: [{name: 'Jon', content: 'would nap again'}],
          rating: 5,
          requestPending: false
        },
        {
          name: 'Jon',
          username: 'JonnyCastle',
          profilePic: 'swazey',
          aboutMe: 'Looking for a lady...I promise you wont be in the corner',
          availability: 'M - F 12:30pm - 1:30pm',
          geolocation: {},
          napPreferences: ['big spoon'],
          envPreferences: ['rain noise', 'night light'],
          reviews: [{name: 'Baby', content: 'i had the time of my life'}],
          rating: 5,
          requestPending: true
        }]




}