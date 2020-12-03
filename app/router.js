const path = require("path");
const clientPath = path.resolve(__dirname + "/../client");

// Router listeners
var router = function(app) {
    app.get("/", function(req, res) {
        res.status(200).sendFile(clientPath + "/index.html");
    });
    app.get("/write-movies", function(req, res) {
        res.status(200).sendFile(clientPath + "/write-movies.html");
    });

    app.get("/browse-movies", function(req, res) {
        res.status(200).sendFile(clientPath + "/browse-movies.html");
    });

    app.get("/view-movies", function(req, res) {
        res.status(200).sendFile(clientPath + "/view-movies.html");
    });
};

module.exports = router;