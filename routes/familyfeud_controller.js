const db = require("../models");

module.exports = function (app) {
  app.get("/api/questions", function (req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Question
    db.Question.findAll({
      include: [db.Question] //not sure if answers should be in their on DB 
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

};