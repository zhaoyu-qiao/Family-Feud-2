// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    app.get("/signUp", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/signUp.html"));
    });
    app.get("/game", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/game.html"));
    });

    app.get("/reserve", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/reserve.html"));
    });

    app.get("/userSuggestions", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/userSuggestions.html"));
    });

    // If no matching route is found default to home
    // app.get("*", function (req, res) {
    //     res.sendFile(path.join(__dirname, "../public/game.html"));
    // });
};