const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const dbURL = process.env.DB_URI || "mongodb://localhost";


// Service listeners
var services = function(app) {
    app.post("/write-record", function(req, res) {

        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function(err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
            } else {
                var dbo = client.db("movies");

                dbo.collection("moviedata").insertOne(newMovie, function(err, res) {
                    if (err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
                    } else {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
                    }
                });
            }
        });
    });

    // reads JSON objects from outputFile, to be used by getMovieData() in movies.js
    app.get("/read-records", function(req, res) {

        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function(err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
            } else {
                var dbo = client.db("movies");

                dbo.collection("moviedata").find().toArray(function(err, data) {
                    if (err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
                    } else {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "SUCCESS", moviedata: data }));
                    }
                });
            }
        });
    });

    app.get("get-moviesByType", function(req, res) {
        var type = req.query.type;
        var search = (type === "") ? {} : { type: type };
        var sortBy = { name: 1 };

        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function(err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
            } else {
                var dbo = client.db("movies");

                dbo.collection("moviedata").find(search).sort(sortBy).toArray(function(err, data) {
                    if (err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
                    } else {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "SUCCESS", moviedata: data }));
                    }
                });
            }
        });
    });

    // remove a record
    app.delete("/delete-record", function(req, res) {
        var movieID = req.query.movieID;

        var s_id = new ObjectId(movieID);
        var search = { _id: s_id };

        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function(err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
            } else {
                var dbo = client.db("movies");

                dbo.collection("moviedata"), deleteOne(search, function(err, res) {
                    if (err) {
                        return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
                    } else {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
                    }
                });
            }
        });
    });

    app.put();
};

module.exports = services;