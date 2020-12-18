const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const dbURL = process.env.DB_URI || "mongodb://localhost";


// Service listeners
var services = function(app) {
    app.post("/write-record", function(req, res) {

        var newMovie = {
            rank: req.body.rank,
            movieTitle: req.body.movieTitle,
            year: req.body.year,
            director: req.body.director,
            rating: req.body.rating,
            users: req.body.users
        };

        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function(err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
            } else {
                var dbo = client.db("movies");

                dbo.collection("moviedata").insertOne(newMovie, function(err, response) {
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

    app.get("/get-moviesByDirector", function(req, res) {
        var director = req.query.director;
        var search = (director === "") ? {} : { director: director };
        var sortBy = { rank: 1 };

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

                dbo.collection("moviedata").deleteOne(search, function(err, response) {
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

    app.put("/update-record", function(req, res) {
        var movieID = req.body.movieID;
        var rank = req.body.rank;
        var movieTitle = req.body.movieTitle;
        var year = req.body.year;
        var director = req.body.director;
        var rating = req.body.rating;
        var users = req.body.users;

        var s_id = new ObjectId(movieID);

        var search = { _id: s_id };
        console.log(search);

        var updateData = {
            $set: {
                rank: rank,
                movieTitle: movieTitle,
                year: year,
                director: director,
                rating: rating,
                users: users
            }
        };
        console.log(updateData);


        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function(err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
            } else {
                var dbo = client.db("movies");

                dbo.collection("moviedata").updateOne(search, updateData, function(err, response) {
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
};

module.exports = services;