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
          reviews: [{name: 'DC', content: 'would nap with again'}],
          rating: 3,
          requestPending: false
        },
        {
          name: 'Jon',
          username: 'JonnyCastle',
          profilePic: 'swazey',
          aboutMe: 'Looking for a lady for napping purposes',
          availability: 'M - F 12:30pm - 1:30pm',
          geolocation: {},
          napPreferences: ['big spoon'],
          envPreferences: ['music', 'night light'],
          reviews: [{name: 'Baby', content: 'he never put me in the corner'}],
          rating: 3,
          requestPending: true
        }]




}