angular.module('Napstr').controller('UsersController', UsersController);

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