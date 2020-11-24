const fs = require("fs");
const path = require("path");
var outputFile = path.join(__dirname + "/files/movies.txt");

// Service listeners
var services = function(app) {
    // takes in data from activateSubmitButton() in movies.js
    app.post("/write-record", function(req, res) {
        var data = req.body.data; // brings in one json object

        // makes sure each movie entry/JSON object is delineated from each other
        if (fs.existsSync(outputFile)) {
            data = ",\n" + data;
        }

        // outputFile gets new movie entry/JSON object, to be used by app.get("/read-records")
        fs.appendFile(outputFile, data, function(err) {
            if (err) {
                res.send(err);
            } else {
                console.log("Record added successfully");
            }
        });
    });

    // reads JSON objects from outputFile, to be used by getMovieData() in movies.js
    app.get("/read-records", function(req, res) {
        fs.readFile(outputFile, "utf8", function(err, data) {
            if (err) {
                res.send(err);
            } else {
                data = "[" + data + "]";
                res.send(data);

                var parsedData = JSON.parse(data);
            }
        });
    });

    // remove a record
    app.delete("/delete-record", function(req, res) {
        var itemID = req.body.data;
        fs.readFile(outputFile, "utf8", function(err, data) {
            if (err) {
                res.send(err);
            } else {
                data = "[" + data + "]";

                var parsedData = JSON.parse(data);
                for (var i = 0; i < parsedData.length; i++) {
                    if (itemID == parsedData[i].ID) {
                        parsedData.splice(i, 1);
                        break;
                    }
                }
                var stringData = JSON.stringify(parsedData);
                var updatedData = stringData.substring(1, stringData.length - 1);

                fs.writeFile(outputFile, updatedData, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Record " + itemID + " deleted successfully");
                    }
                });

                res.status(204);
            }
        });
    });
};

module.exports = services;