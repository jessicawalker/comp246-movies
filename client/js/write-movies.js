var app = angular.module("writeMoviesApp", []);

app.controller("writeMoviesController", function($scope, $http) {
    $scope.submitMovie = function() {

        var d = new Date();
        var ID = "mov" + d.getTime();

        $http({
            method: "POST",
            url: "http://localhost:5500/write-record",
            data: {
                "ID": ID,
                "rank": $scope.rank,
                "movieTitle": $scope.movieTitle,
                "year": $scope.year,
                "director": $scope.director,
                "rating": $scope.rating,
                "users": $scope.users
            }
        }).then(function(response) {
            console.log("1: " + response);
            console.log("1: " + response.statusText);

            if (rank == "" || movieTitle == "" || year == "" || director == "" || rating == "" || users == "") {
                return;
            }
            if(response.statusText === "OK") {
                console.log("2: " + response);
                $scope.rank = "";
                $scope.movieTitle = "";
                $scope.year = "";
                $scope.director = "";
                $scope.rating = "";
                $scope.users = "";
                $scope.addResults = "Movie record successfully added.";
            }
            else {
                console.log("3: " + response);
                $scope.addResults = response.statusText;
            }
        }, function(response) {
            console.log("4: " + response);
        });
    };
});