// retrieve the movie data and populate on page load, sent by app.get("/read-records")

var app = angular.module("moviesTableApp", []);

app.controller("moviesTableController", function($scope, $http) {
    $scope.moviedata = [];
    $scope.directors = [];

    $scope.get_movies = function() {
        $http({
            method: "GET",
            url: moviesURL + "/read-records"
            //url: "http://localhost:5500/read-records"
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                $scope.moviedata = response.data.moviedata;
                $scope.directors = getDirectors(response.data.moviedata);
                $scope.selectedDirector = $scope.directors[0];
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




/*
var data;
var keyName; // default view

$.ajax({
    url: moviesURL + "/read-records",
    type: "get",
    success: function(response) {
        data = JSON.parse(response);
        createMovieTable(data.sort(sortByKey(keyName)));
    },
    error: function(err) {
        alert(err);
    }
});

function sortByKey(key) {

    if (key == "ID" || key == "movieTitle" || key == "director") {
        return function(a, b) {
            if (a[key] > b[key])
                return 1;
            else if (a[key] < b[key])
                return -1;

            return 0;
        };
    } else if (key == "rank") {
        return function(a, b) { return a[key] - b[key]; };
    } else {
        return function(a, b) { return b[key] - a[key]; };
    }
}

function reload_js(src) {
    $("script[src=\"" + src + "\"]").remove();
    $("<script>").attr("src", src).appendTo("head");
};

// inserts table row of data inside display table
function createMovieTable(movieData) {
    var tableHTML = "";

    for (var i = 0; i < movieData.length; i++) {
        tableHTML += "<tr>";
        tableHTML += "<td>" + movieData[i].ID + "</td>";
        tableHTML += "<td>" + movieData[i].rank + "</td>";
        tableHTML += "<td>" + movieData[i].movieTitle + "</td>";
        tableHTML += "<td>" + movieData[i].year + "</td>";
        tableHTML += "<td>" + movieData[i].director + "</td>";
        tableHTML += "<td>" + movieData[i].rating + "</td>";
        tableHTML += "<td>" + movieData[i].users.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td>";
        tableHTML += "<td class=\"delete_button\">" +
            "<button data-id=\"" +
            movieData[i].ID +
            "\">delete</button></td>";
        tableHTML += "</tr>";
    }

    // id of tbody in browse-movies page's display table
    $("#movieTable").html(tableHTML);

    $(".delete_button button").click(function() {
        var itemID = this.getAttribute("data-id");
        var timeout = setTimeout(function() {
            location.reload();
        }, 500);

        $.ajax({
            url: moviesURL + "/delete-record",
            type: "delete",
            data: { data: itemID },
            success: $(this).closest("tr").animate({ opacity: "0" }, timeout),
            error: function(err) {
                alert(err);
            }
        });
    });
}*/