console.log('zzzz');

function initMap() {

  var customMapType = new google.maps.StyledMapType(
    [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#b5cbe4"}]},{"featureType":"landscape","stylers":[{"color":"#efefef"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#83a5b0"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#bdcdd3"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e3eed3"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}])
    var customMapTypeId = 'custom_style';

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.5860, lng: -73.6678},
    scrollwheel: false,
    zoom: 15,
    mapTypeControleOptions: {mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]}
    });

  map.mapTypes.set(customMapTypeId, customMapType);
  map.setMapTypeId(customMapTypeId);


  var displayPosition = function(position) {
    console.log('Latitude: ' + position.coords.latitude + ', Longitude: ' + position.coords.longitude);
    console.log(watchID);
    var pos = {lat: position.coords.latitude, lng: position.coords.longitude};
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
        var newNapMarker = new google.maps.Marker({
          position: napstrPos,
          map: map,
          icon: zzz
        });

        var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h4>' + napstr.username + '</h4>' +
        '<img class="map-thumbnail" src=' + napstr.profilePic + '>' +
        '<p> <em>' + napstr.aboutMe + '</em> </p>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        var infoWindow = new google.maps.InfoWindow({
          content: contentString
        });

        newNapMarker.addListener('click', function(){
          infowindow.open(map, newNapMarker);
        })
      })
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

  var $signupBtn = $('#signup-btn');
  var $closeSignupBtn = $('#close-signup');
  var $signupModal = $('#signup-modal-container');

  var $editBtn = $('#edit-btn');
  var $closeEditBtn = $('#close-edit');
  var $editModal = $('#edit-modal-container');

  var toggleSignupContainer = function(event) {
    event.preventDefault();
    $signupModal.toggle();
  }

  var toggleEditContainer = function(event) {
    event.preventDefault();
    $editModal.toggle();
  }

  $signupBtn.click(toggleSignupContainer);
  $closeSignupBtn.click(toggleSignupContainer);

  $editBtn.click(toggleEditContainer);
  $closeEditBtn.click(toggleEditContainer);


  $('#confirm-form').click(function(){
    event.preventDefault();
    var requestor = $('#confirm-form').serializeArray()[0].value;
    var requestDate = $('#confirm-form').serializeArray()[1].value;
    var userId = $('#confirm-form').serializeArray()[2].value;
    var request = {name: requestor, date: requestDate};
    $.ajax({
      url: '/requests/' + userId + '/confirm',
      type: 'post',
      dataType: 'JSON',
      data: request
    }).done(function(response){

    })});

  $('#deny-form').click(function(){
    event.preventDefault();
    var requestor = $('#deny-form').serializeArray()[0].value;
    var requestDate = $('#deny-form').serializeArray()[1].value;
    var userId = $('#deny-form').serializeArray()[2].value;
    var request = {name: requestor, date: requestDate};
    $.ajax({
      url: '/requests/' + userId + '/deny',
      type: 'post',
      dataType: 'JSON',
      data: request
    }).done(function(response){

    })});


})




















