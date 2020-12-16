var app = angular.module("writeMoviesApp", []);

app.controller("writeMoviesController", function($scope, $http) {
    $scope.submitMovie = function() {

        $http({
            method: "POST",
            url: "http://localhost:5500/write-record",
            data: {
                "rank": $scope.rank,
                "movieTitle": $scope.movieTitle,
                "year": $scope.year,
                "director": $scope.director,
                "rating": $scope.rating,
                "users": $scope.users
            }
        }).then(function(response) {

            if (rank == "" || movieTitle == "" || year == "" || director == "" || rating == "" || users == "") {
                return;
            }
            if (response.statusText === "OK") {
                $scope.rank = "";
                $scope.movieTitle = "";
                $scope.year = "";
                $scope.director = "";
                $scope.rating = "";
                $scope.users = "";
                $scope.addResults = "Movie record successfully added.";
            } else {
                $scope.addResults = response.statusText;
            }
        }, function(response) {
            $scope.addResults = response.statusText;
        });
    };
});