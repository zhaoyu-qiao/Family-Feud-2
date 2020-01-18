const db = require("../models");
module.exports = function (app) {
    app.get("/api/questions", function (req, res) {
      // Here we add an "include" property to our options in our findAll query
      // We set the value to an array of the models we want to include in a left outer join
      // In this case, just db.Question
      db.Question.findAll({
        include: [db.Question] //not sure if answers should be in their on DB  //TODO reconsider what this is doing
      }).then(function (dbQuestion) {
        res.json(dbQuestion);
      });
    });
    // res.send('hello world'); 
    //   });
    app.get("/api/questions/:id", function (req, res) {
      console.log("hi");
      // Here we add an "include" property to our options in our findOne query
      // We set the value to an array of the models we want to include in a left outer join
      // In this case, just db.Question
      db.Question.findOne({
        where: {
          id: req.params.id
        },
        include: [db.Question] //not sure if answers should be its own DB
      }).then(function (dbQuestion) {
        res.json(dbQuestion);
      });
    });
    // Admin has ability to add questions
    //Here we add an "write" property to our DB
    // In this case, just db.Question
    app.post("/api/questions", function (req, res) {
      db.Question.create(req.body).then(function (dbQuestion) {
        res.json(dbQuestion);
      });
    });
    //admin has ability to delete 
    app.delete("/api/questions/:id", function (req, res) {
      db.Question.destroy({
        where: {
          id: req.params.id
        }
      }).then(function (dbQuestion) {
        res.json(dbQuestion);
      });
    });

    // create api score
    app.post("/api/userscore", function (req, res) {
      db.UserScore.create(req.body).then(function (userScore) {
        res.json(userScore);
      });
    });

    app.get("/api/userscore", function (req, res) {
          console.log("we hit the highscores")
          db.UserScore.findAll().then(function (dbUserScore) {
            res.json(dbUserScore);
          })

          // app.post("/api/highscores", function (req, res) {

          //   console.log(req.body)
          //   db.Highscore.create({
          //     username: req.body.username,
          //     email: req.body.email,
          //     password: req.body.password
          //   }).then(function () {
          //     res.json({
          //       success: true
          //     });
          //   }).catch(function (err) {
          //     console.log(err);
          //     res.json({
          //       success: false
          //     });
          //     // res.status(422).json(err.errors[0].message);
          //   });
          // });

          // 
          app.post("/api/highscores", function (req, res) {
            console.log(req.body)
          })
        };