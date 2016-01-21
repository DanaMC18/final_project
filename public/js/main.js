console.log('zzzz');

$(document).ready(function(){

  var displayPosition = function(position) {
    console.log('Latitude: ' + position.coords.latitude + ', Longitude: ' + position.coords.longitude);
    console.log(watchID);
    
    var coordsObject = {lat: position.coords.latitude, lng: position.coords.longitude};

    $.ajax({
      url: '/search',
      type: 'post',
      dataType: 'JSON',
      data: coordsObject
    }).done(function(response){
      console.log(response)
    })
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
    var options = {enableHighAccuracy: true, timeout: 5000, frequency: 1}
    var watchID = navigator.geolocation.watchPosition(displayPosition, displayError, options)
  } else {
    alert('Geolocation is not supported by this browser')
  }



})