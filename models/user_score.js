//!!new user score
// Sequelize (capital) references the standard library
let Sequelize = require("sequelize");
let config = require('../config/config.json');
// sequelize (lowercase) references my connection to the DB.
//let User = require('/models/user.js');
//console.log(User);
// Creates a "User" model that matches up with DB
module.exports = function (sequelize, DataTypes) {
  let UserScore = sequelize.define("user_score", {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true
    },
    userId: {
      type: Sequelize.INTEGER,
      field: 'user_id'
    },
    score: {
      type: Sequelize.INTEGER,
      field: 'score'
    },
  }, {
    tableName: 'user_scores',
    timestamps: false
  });
  return UserScore;
};
// UserScore.belongsTo(User, {
//   foreignKey: 'userId'
// });
// Syncs with DB
// UserScore.sync();
// Makes the QUestion Model available for other files (will also create a table)
// module.exports = UserScore;




// // Sequelize (capital) references the standard library
// let Sequelize = require("sequelize");
// let config = require('../config/config.json');
// // sequelize (lowercase) references my connection to the DB.
// let sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
//   host: config.host,
//   dialect: 'mysql'
// });
// //let User = require('/models/user.js');
// //console.log(User);
// // Creates a "User" model that matches up with DB
// let UserScore = sequelize.define("user_score", {
//   id: {
//     type: Sequelize.INTEGER,
//     field: 'id',
//     primaryKey: true
//   },
//   userId: {
//     type: Sequelize.INTEGER,
//     field: 'user_id'
//   },
//   score: {
//     type: Sequelize.INTEGER,
//     field: 'score'
//   },
// }, {
//   tableName: 'user_scores',
//   timestamps: false
// });
// // UserScore.belongsTo(User, { //TODO fix association with User table
// //   foreignKey: 'userId'
// // });
// // Syncs with DB
// UserScore.sync();
// // Makes the QUestion Model available for other files (will also create a table)
// module.exports = UserScore;