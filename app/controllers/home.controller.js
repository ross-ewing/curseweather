app.controller('homeWeather', function($scope) {
  i = 0;
  $scope.submitForm = function(inputCity) {
    var weather = getWeather(inputCity);
    var forecast = getForecast(inputCity);
    console.log(forecast);
    rainArray = [];
    timeArray = [];
    k = 0;
    forecast.forecast.forecastday[0].hour.forEach(function() {
      rainArray.push(forecast.forecast.forecastday[0].hour[k].precip_in);
      var d = forecast.forecast.forecastday[0].hour[k].time;
      d = d.split(' ')[1];
      timeArray.push(d);
      k++
      console.log(timeArray);
    });
    rainChart(rainArray);
    $scope.weather = weather;

    var swear = swears[Math.floor(Math.random() * swears.length)];
    $scope.swearWeather = swear + " " + forecast.current.condition.text;

    var words = $scope.swearWeather,
      wordArray = words.split(' ');
    $scope.weatherArray = wordArray;

    var temp = forecast.current.feelslike_c;
    $scope.temp = "Temperature: " + temp + "°C";
    var lat = forecast.location.lat;
    var long = forecast.location.lon;
    getMap(long, lat);
    i++
  };

  var swears = ['fucking', 'damn', 'crappy', 'shitty', 'tossing', 'fucking'];

  function getWeather(town) {
    // var token1 = '&APPID=def3afd6110da830af14acce613b0091';
    var token = 'key=aa42486bf3e341f8870133858171108';
    return JSON.parse($.ajax({
      type: 'GET',
      // url: 'http://api.openweathermap.org/data/2.5/weather?q=' + town + token,
      url: 'http://api.apixu.com/v1/current.json?' + token + '&q=' + town,
      dataType: 'json',
      global: false,
      async: false,
      success: function(data) {
        return data;
        // console.log(data);
      }
    }).responseText);
    $scope.loading = true;
  };

  function getForecast(town) {
    // var token = '&APPID=def3afd6110da830af14acce613b0091';
    var token = 'key=aa42486bf3e341f8870133858171108';
    return JSON.parse($.ajax({
      type: 'GET',
      // url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + town + token,
      url: 'http://api.apixu.com/v1/forecast.json?' + token + '&q=' + town,
      dataType: 'json',
      global: false,
      async: false,
      success: function(data) {
        return data;
        // console.log(data);
      }
    }).responseText);
    $scope.loading = true;
  };

  function rainChart(rainArray) {
    $(".rainChart .rainSvg").empty();
    var svg = d3.select(".rainChart .rainSvg").append("svg")
      .attr("height", "200px")
      .attr("width", "120%");

    svg.selectAll("rect")
      .data(rainArray)
      .enter().append("rect")
      .attr("height", function(d, i) {
        return (d * 2000 + 0.5)
      })
      .attr("width", "40")
      .attr("x", function(d, i) {
        return (i * 60) + 25
      })
      .attr("y", function(d, i) {
        return 100 - (d * 4)
      });
    svg.selectAll("text")
      .data(timeArray)
      .enter()
      .append("text")
      .text(function(d) {
        return d;
      })
      .attr("height", function(d, i) {
        return 50
      })
      .attr("x", function(d, i) {
        return (i * 60) + 25
      })
      .attr("y", function(d, i) {
        return 80
      })
      // .attr("transform", "rotate(90)")
      .style("text-anchor", "right")
      .attr("font-family", "sans-serif")
      .attr("font-size", "13px")
      .attr("font-weight", "800")
      .attr("fill", "black");
  }

  $scope.rainChartToggle = function() {
    console.log('click');
    $('.rainContain').toggle();
    $('.rainChart').toggle();
    $('h1#fuckingWeather').toggle();
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
        disableDefaultUI: true,
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
