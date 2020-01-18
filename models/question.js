// Sequelize (capital) references the standard library
let Sequelize = require("sequelize");
// let config = require('../config/config.json');
// // sequelize (lowercase) references my connection to the DB.
// let sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
//   host: config.host,
//   dialect: 'mysql'
// });
// Creates a "Question" model that matches up with DB
module.exports = function (sequelize, DataTypes) {
let Question = sequelize.define("question", {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true
  },
  quest: {
    type: Sequelize.STRING,
    field: 'quest'
  },
  answer_1: {
    type: Sequelize.STRING,
    field: 'answer_1'
  },
  answer_score_1: {
    type: Sequelize.INTEGER,
    field: 'answer_score_1'
  },
  answer_2: {
    type: Sequelize.STRING,
    field: 'answer_2'
  },
  answer_score_2: {
    type: Sequelize.INTEGER,
    field: 'answer_score_2'
  },
  answer_3: {
    type: Sequelize.STRING,
    field: 'answer_3'
  },
  answer_score_3: {
    type: Sequelize.INTEGER,
    field: 'answer_score_3'
  },
  answer_4: {
    type: Sequelize.STRING,
    field: 'answer_4'
  },
  answer_score_4: {
    type: Sequelize.INTEGER,
    field: 'answer_score_4'
  },
  answer_5: {
    type: Sequelize.STRING,
    field: 'answer_5'
  },
  answer_score_5: {
    type: Sequelize.INTEGER,
    field: 'answer_score_5'
  },
  answer_6: {
    type: Sequelize.STRING,
    field: 'answer_6'
  },
  answer_score_6: {
    type: Sequelize.INTEGER,
    field: 'answer_score_6'
  },
}, {
  tableName: 'questions',
  timestamps: false
});
return Question}
// Syncs with DB
//Question.sync();
// Makes the QUestion Model available for other files (will also create a table)
//module.exports = Question;