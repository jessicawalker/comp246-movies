var movies = [];
var activeMovie = 0;

var app = angular.module("viewMoviesApp", []);

app.controller("viewMoviesController", function($scope, $http) {
    $scope.movies = [];

    $scope.get_movies = function() {
        $http({
            method: "GET",
            url: "http://localhost:5500/read-records"
        }).then(function(response) {
            if (response.statusText === "OK") {
                movies = response.data;
                $scope.obj = movies[activeMovie];
                $scope.showHide();
            } else {
                console.log(response);
                $scope.addResults = response.statusText;
            }
        }, function(response) {
            console.log(response);
        });
    };

    $scope.get_movies();

    $scope.changeMovie = function(direction) {
        activeMovie += direction;
        $scope.obj = movies[activeMovie];
        $scope.showHide();
    }

    $scope.showHide = function() {
        $scope.hidePrev = (activeMovie === 0) ? true : false;
        $scope.hideNext = (activeMovie === movies.length - 1) ? true : false;
    };
});