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
});
