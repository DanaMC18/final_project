console.log('zzzz');

$(document).ready(function(){

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

  

})