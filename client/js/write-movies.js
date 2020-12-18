var app = angular.module("writeMoviesApp", []);

app.controller("writeMoviesController", function($scope, $http) {
    $scope.submitMovie = function() {

        $http({
            method: "POST",
            url: moviesURL + "/write-record",
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

// display data entered by user
/*
displayInput();

function displayInput() {
    var successAdded = document.getElementById("success-added");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var successMessage = "Movie record successfully added:<br>";

    // don't display box if nothing has been submitted
    if (urlParams.has("rank")) {
        successAdded.style.opacity = "1";
    }

    //const values = urlParams.values()
    var entries = urlParams.entries();
    for (var entry of entries) {
        successMessage += "<br>\n";
        successMessage += `${entry[0]}: ${entry[1]}`;
    }
    successAdded.innerHTML = successMessage;
}*/