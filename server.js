//const db = require("../models");
// Dependencies
// =============================================================

let express = require("express");
let bodyParser = require("body-parser");
let methodOverride = require("method-override");
let Sequelize = require("sequelize");
let db = require("./models");
let PORT = process.env.PORT || 3000;
let app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
let session = require("express-session");
// Requiring passport as we've configured it
let passport = require("./config/passport");
app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// Import routes and give the server access to them.
// let routes = require("./routes/familyfeud_controller.js")(app);
// app.use(routes);
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log('server listening on: http://localhost:' + PORT);
    });
});
// app.get("/api/questions", function (req, res) {
//     let question = require('./models/question.js');
//     // Here we add an "include" property to our options in our findAll query
//     // We set the value to an array of the models we want to include in a left outer join
//     // In this case, just db.Question
//     question.findAll({
//         atributes: ['name'] //not sure if answers should be in their on DB 
//     }).then(function (question) {
//         res.json(question);
//     });
// });



app.get("/api/questions", function (req, res) {
    //let question = require('./models/question.js');
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Question
    db.question.findAll({
            // attribute: 'random()',
            order: [
                [Sequelize.literal('RAND()')]
            ],
            limit: 3
        })
        .then((question) => {
            res.json(question);
        });
});


app.get("/api/users", function (req, res) {
    //let user = require('./models/user.js');
    //let userScore = require('./models/user_score.js');
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Question
    db.User.findAll({
        atributes: ['name', 'email'], //not sure if answers should be in their on DB
        // include: 
        //     [db.userScore]
        // ,
    }).then(function (user) {
        res.json(user);
    });
});

// create api for userscore
app.post("/api/userscore", function (req, res) {
    //let userScore = require('./models/user_score.js');

    db.userScore.create(req.body).then(function (userScore) {
        res.json(userScore);
    });
});

// get data from api userscore
app.get("/api/userscore", function (req, res) {
    //let userScore = require('./models/user_score.js');

    db.userScore.findAll().then(function (dbUserScore) {
        res.json(dbUserScore);
    })
})

require("./routes/html_routes")(app);
require("./routes/api-routes")(app);

//require("./routes/authentication")(app);

//require("./routes/familyfued_controlers")(app);

// !!!Need for sign up sign in