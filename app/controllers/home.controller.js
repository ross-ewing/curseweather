app.controller('homeWeather', function($scope) {
  i = 0;

  $scope.submitForm = function(inputCity) {
    var weather = getWeather(inputCity);
    $scope.weather = weather;
    var swear = swears[Math.floor(Math.random() * swears.length)];
    $scope.swear = swear;
    var temp = weather.main.temp_max - 270.15;
    $scope.temp = "Temperature: " + temp + "°C";
    console.log(weather);
    var lat = weather.coord.lat;
    var long = weather.coord.lon;
    getMap(long, lat);
    i++
  };

  var swears = ['fucking', 'damn', 'crappy', 'shitty', 'tossing', 'fucking'];

  function getWeather(town) {
    var token = '&APPID=def3afd6110da830af14acce613b0091';
    return JSON.parse($.ajax({
      type: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + town + token,
      dataType: 'json',
      global: false,
      async: false,
      success: function(data) {
        return data;
      }
    }).responseText);
    $scope.loading = true;
  };

  function getMap(long, lat) {
    showGoogleMaps();

    function showGoogleMaps() {
      var latLng = new google.maps.LatLng(lat, long);

      var mapOptions = {
        zoom: 16, // initialize zoom level - the max value is 21
        streetViewControl: false, // hide the yellow Street View pegman
        scaleControl: false, // allow users to zoom the Google Map
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: latLng,
        styles: [{
            elementType: 'geometry',
            stylers: [{
              color: '#FFFFFF'
            }]
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [{
              color: '#FFFFFF'
            }]
          },
          {
            elementType: 'labels.text.fill',
            stylers: [{
              color: '#FFFFFF'
            }]
          },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{
              color: '#FFFFFF'
            }]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{
              color: '#FFFFFF'
            }]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{
              color: '#FFFFFF'
            }]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{
              color: '#FFFFFF'
            }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{
              color: '#f2f2f2'
            }]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{
              color: '#f2f2f2'
            }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{
              color: '#f2f2f2'
            }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{
              color: '#f2f2f2'
            }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{
              color: '#f2f2f2'
            }]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{
              color: '#f2f2f2'
            }]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{
              color: '#f2f2f2'
            }]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{
              color: '#f2f2f2'
            }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{
              color: '#f2f2f2'
            }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{
              color: '#f2f2f2'
            }]
          },
          {
            elementType: "labels",
            stylers: [{
              visibility: 'off'
            }]
          },
          {
            disableDefaultUI: true
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{
              color: '#f2f2f2'
            }]
          }
        ]
      };

      map = new google.maps.Map(document.getElementById('googlemaps'),
        mapOptions);
      // Show the default red marker at the location
    }

    google.maps.event.addDomListener(window, 'load', showGoogleMaps);
  };

});
