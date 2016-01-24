console.log('zzzz');

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 40.5860, lng: -73.6678},
  scrollwheel: false,
  zoom: 15
  });
  // var infoWindow = new google.maps.InfoWindow({map: map});

  var displayPosition = function(position) {
    console.log('Latitude: ' + position.coords.latitude + ', Longitude: ' + position.coords.longitude);
    console.log(watchID);
    var pos = {lat: position.coords.latitude, lng: position.coords.longitude};

    // infoWindow.setPosition(pos);
    // infoWindow.setContent('You are here.');
    map.setCenter(pos);

    var zzz = 'imgs/zzz.png';
    var napMarker = new google.maps.Marker({
      position: pos,
      map: map,
      icon: zzz
    });

    $.ajax({
      url: '/search',
      type: 'post',
      dataType: 'JSON',
      data: pos
    }).done(function(response){
      response.forEach(function(napstr){
        var lat = parseFloat(napstr.location.coordinates[0]);
        var lng = parseFloat(napstr.location.coordinates[1]);
        var napstrPos = {'lat': lat, 'lng': lng}
        new google.maps.Marker({
          position: napstrPos,
          map: map,
          icon: zzz
        });
      })
      // console.log(response)
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
}


$(document).ready(function(){

  var $editBtn = $('#edit-btn');
  var $closeEditBtn = $('#close-edit');
  var $editModal = $('#edit-modal-container');

  var toggleEditContainer = function(event) {
    event.preventDefault();
    $editModal.toggle();
  }

  $editBtn.click(toggleEditContainer);
  $closeEditBtn.click(toggleEditContainer);


})




















