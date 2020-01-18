// *** Passport.js Authentication ***
// Cited: https://dev.to/gm456742/building-a-nodejs-web-app-using-passportjs-for-authentication-3ge2
//we import passport packages required for authentication
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
// let passportLocalSequelize = require('passport-local-sequelize');
//
//We will need the models folder to check passport against
let db = require("../models");
// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username/email and password
passport.use(new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    // {
    //     // usernameField: "email"
    //     usernameField: "username",
    //     // passwordField: "password",
    // },
    function (username, password, done) {
        // When a user tries to sign in this code runs
        db.User.findOne({
            where: {
                // email: email
                username: username
            }
        }).then(function (User) {
            // If there's no user with the given username
            if (!User) {
                return done(null, false, {
                    // message: "Incorrect Username or Password"
                });
            }
            // If there is a user with the given email, but the password the user gives us is incorrect
            else if (!User.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect Username or Password"
                });
            }
            // If none of the above, return the user
            return done(null, User);
        });
    }
));
//
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
//
// Exporting our configured passport
module.exports = passport;