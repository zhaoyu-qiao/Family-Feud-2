// !!! This needs to be fixed. 
const db = require("../models");
module.exports = function (app) {
    app.get("/api/current_questions", function (req, res) {
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Question
        // db.Question.findAll({
        //     include: [db.Question] //not sure if answers should be in their on DB  //TODO reconsider what this is doing
        // }).then(function (dbQuestion) {
        //     res.json(dbQuestion);
        // });

        db.Question.findAll({
            order: Sequelize.literal('rand()'),
            limit: 3
        }).then(function (randomQuestion) {
            // Return random encounter
            res.json(randomQuestion);
        });
    });
}