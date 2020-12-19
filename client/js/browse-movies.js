var app = angular.module("moviesTableApp", []);

app.controller("moviesTableController", function($scope, $http) {
    $scope.moviedata = [];
    $scope.directors = [];
    $scope.sortBy = [{ value: "rank", display: "Rank" }, { value: "movieTitle", display: "Movie Title" }, { value: "year", display: "Year" }, { value: "director", display: "Director" }, { value: "rating", display: "Rating" }, { value: "users", display: "Users" }];

    $scope.get_movies = function() {
        $http({
            method: "GET",
            url: moviesURL + "/read-records"
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                $scope.moviedata = response.data.moviedata;
                $scope.directors = getDirectors(response.data.moviedata);
                $scope.selectedDirector = $scope.directors[0];
                $scope.selectedSortBy = $scope.sortBy[0];
            } else {
                console.log(response.data.msg);
            }
        }, function(response) {
            console.log(response);
        });
    };

    $scope.get_movies();

    $scope.redrawTable = function() {
        var director = $scope.selectedDirector.value;

        $http({
            method: "GET",
            url: moviesURL + "/get-moviesByDirector",
            params: { director: director }
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                $scope.moviedata = response.data.moviedata;
                $scope.selectedSortBy = $scope.sortBy[0];
            } else {
                console.log(response.data.msg);
            }
        }, function(response) {
            console.log(response);
        });
    };

    $scope.sortTable = function() {
        var sortByValue = $scope.selectedSortBy.value;
        var director = $scope.selectedDirector.value;

        $http({
            method: "GET",
            url: moviesURL + "/sort-records",
            params: { sortByKey: sortByValue, director: director }
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                $scope.moviedata = response.data.moviedata;
            } else {
                console.log(response.data.msg);
            }
        }, function(response) {
            console.log(response);
        });
    };

    $scope.deleteMovie = function(movieID) {
        $http({
            method: "DELETE",
            url: moviesURL + "/delete-record",
            params: { movieID: movieID }
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                $scope.redrawTable();
            } else {
                console.log(response.data.msg);
            }
        }, function(response) {
            console.log(response);
        });
    };

    $scope.editMovie = function(movieNumber) {
        $scope.rank = $scope.moviedata[movieNumber].rank;
        $scope.movieTitle = $scope.moviedata[movieNumber].movieTitle;
        $scope.year = $scope.moviedata[movieNumber].year;
        $scope.director = $scope.moviedata[movieNumber].director;
        $scope.rating = $scope.moviedata[movieNumber].rating;
        $scope.users = $scope.moviedata[movieNumber].users;
        $scope.movieID = $scope.moviedata[movieNumber]['_id'];

        $scope.hideTable = true;
        $scope.hideForm = false;
    };

    $scope.updateMovie = function(movieNumber) {
        $http({
            method: "PUT",
            url: moviesURL + "/update-record",
            data: {
                movieID: $scope.movieID,
                rank: $scope.rank,
                movieTitle: $scope.movieTitle,
                year: $scope.year,
                director: $scope.director,
                rating: $scope.rating,
                users: $scope.users
            }
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                $scope.redrawTable();
                $scope.closeForm();
            } else {
                console.log(response.data.msg);
            }

        }, function(response) {
            console.log(response);
        });
    };

    $scope.closeForm = function(movieNumber) {
        $scope.hideForm = true;
        $scope.hideTable = false;

        $scope.rank = "";
        $scope.movieTitle = "";
        $scope.year = "";
        $scope.director = "";
        $scope.rating = "";
        $scope.users = "";

    };
});

function getDirectors(movieDataArray) {
    var directorExists;

    var directorsArray = [{ value: "", display: "ALL" }];
    for (var i = 0; i < movieDataArray.length; i++) {
        directorExists = directorsArray.find(function(element) {
            return element.value === movieDataArray[i].director;
        });

        if (directorExists) {
            continue;
        } else {
            directorsArray.push({ value: movieDataArray[i].director, display: movieDataArray[i].director });
        }
    }

    return directorsArray;
}