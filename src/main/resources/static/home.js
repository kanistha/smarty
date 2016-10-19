angular.module('demo', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider.when('/', {
            controller : 'home',
            templateUrl : '/index.html'
        }).otherwise({
            controller : 'home',
            templateUrl: 'public/index.html'
        })
    })
    .controller('home', function ($scope, $http) {
        console.log('inside controller');
        $http.get('/greeting').then(function (response) {
            //http://rest-service.guides.spring.io/greeting
            $scope.greeting = response.data;
        });
        // $scope.greeting = 'Hmmmmmmmmmmmmmmmmmmm';
    });
