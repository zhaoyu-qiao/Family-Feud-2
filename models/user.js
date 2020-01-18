// *** Passport.js Authentication ***
// Cited: https://dev.to/gm456742/building-a-nodejs-web-app-using-passportjs-for-authentication-3ge2
// Requiring bcrypt for password hashing. Using the bcryptjs version as 
//the regular bcrypt module sometimes causes errors on Windows machines
let bcrypt = require("bcryptjs");
let sequelize = require('sequelize');
let passportLocalSequelize = require('passport-local-sequelize');
let UserScore = require('./user_score.js');
//
// Creating our User model
//Set it as export because we will need it required on the server
module.exports = function (sequelize, DataTypes) {
  //return sequelize.define("User")...This is Justin's example
  let User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    // already_user: {
    //     type: DataTypes.BOOLEAN,
    //     unique: boolean,
    //     allowNull: false,
    // },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // Creating a custom method for our User model. 
  //This will check if an unhashed password entered by the 
  //user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compare(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  // User.hook("beforeCreate", function (user) {
  //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  // });
  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
// User.hasMany(UserScore, {
//     foreignKey: 'user_id'
// });
//This is a fix by Samaila Philemon Bala in case you want to use ES6
//and the above is not working
//User.beforeCreate(user => {
//  user.password = bcrypt.hashSync(
//  user.password,
//bcrypt.genSaltSync(10),
//null
//);
//});