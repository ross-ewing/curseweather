var app = angular.module("curseWeather", ['ngRoute', 'ngMaterial']);

app.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/home', {
      templateUrl: 'partials/home.html',
    })
    .when('/', {
      templateUrl: 'partials/home.html',
    })
    .otherwise({
      templateUrl: 'partials/404.html'
    });
});

app.controller('mainCtrl', function($scope, $window) {
  $scope.loading = true;
});
