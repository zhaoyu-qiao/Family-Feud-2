// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
// Dependencies
// =============================================================
// Requiring our models and passport as we've configured it
let db = require("../models");
let passport = require("../config/passport");
let bcrypt = require('bcryptjs');
// Requiring our Todo model
// let db = require("../models");
// let bcrypt = require('bcryptjs');
// const saltRounds = 10;
// Routes
// =============================================================
// *** Passport.js Authentication ***
// Cited: https://dev.to/gm456742/building-a-nodejs-web-app-using-passportjs-for-authentication-3ge2
module.exports = function (app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post('/api/signIn', passport.authenticate('local'),
        function (req, res) {
            console.log('hitting function')
            res.json({
                success: true
            });
        });
    // app.post('/api/signIn', passport.authenticate('local'), function (req, res) {
    //       res.json({
    //         sucess: true})
    //       });
    // app.post('/api/signIn', passport.authenticate('local'), function (req, res) {
    //   // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    //   // So we're sending the user back the route to the members page because the redirect will happen on the front end
    //   // They won't get this or even be able to access this page if they aren't authed
    //   console.log('hitting function api route.js')
    //   res.json("/game")
    // });
    app.post("/api/signUp", function (req, res) {
        // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
        // So we're sending the user back the route to the members page because the redirect will happen on the front end
        // They won't get this or even be able to access this page if they aren't authed
        console.log("WE SHOUDL SEE THIS")
        console.log(req.body)
        db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }).then(function () {
            res.json({
                success: true
            });
        }).catch(function (err) {
            console.log(err);
            res.json({
                success: false
            });
            // res.status(422).json(err.errors[0].message);
        });
    });
    // ******* Possible function to verify if username already exists when user creates an account *************
    // app.post("/api/signUp", function (req, res, username, done) {
    //       db.User.findOne({
    //           where: {
    //             username: username
    //           }
    //         }).then(function (User, err) {
    //             if (err) {
    //               console.log("err", err)
    //               return done(err);
    //             }
    //             if (User) {
    //               console.log('signupMessage', 'That username is already taken.');
    //               return done(null, false, {
    //                 message: "Sorry, that username is already taken. Try another one."
    //             } else {
    //               db.User.create({
    //                 username: req.body.username,
    //                 email: req.body.email,
    //                 password: req.body.password
    //               }).then(function () {
    //                 res.json({
    //                   success: true
    //                 });
    //               }).catch(function (err) {
    //                 console.log(err);
    //                 res.json({
    //                   success: false
    //                 });
    //                 // res.status(422).json(err.errors[0].message);
    //               });
    //             })
    //             };
    // app.post("/api/signIn", passport.authenticate('local', {
    //   failureRedirect: '/'
    // }), (req, res) => {
    //   res.redirect("/game")
    // })
    // app.post('/api/signIn', passport.authenticate('local', {
    //     failureRedirect: '/index'
    //   }),
    //   function (req, res) {
    //     res.redirect('/game');
    //   });
    //
    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    // app.post("/api/signUp/beta", function (req, res) {
    //   console.log(req.body);
    // });
    //
    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });
    //
    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                username: req.user.username,
                id: req.user.id
            });
        }
    });
    // login page: storing and comparing email and password,and redirecting to home page after login
    // app.post('/api/signIn', function (req, res) {
    //   db.User.findOne({
    //     where: {
    //       username: req.body.username
    //     }
    //   }).then(function (user) {
    //     if (!user) {
    //       res.redirect('/game');
    //     } else {
    //       bcrypt.compare(req.body.password, user.password, function (err, result) {
    //         if (result == true) {
    //           res.redirect('/game');
    //         } else {
    //           res.send('Incorrect password');
    //           res.redirect('/');
    //         }
    //       });
    //     }
    //   });
    // });

    // userSuggestion page:
    // Cited Class Activity: https://harvard.bootcampcontent.com/Harvard-Coding-Boot-Camp/hu-cam-fsf-pt-09-2019-u-c/blob/master/Week_15/01-Activities/09-Sequelize-Update-Delete/S// Cited Class Activity: https://harvard.bootcampcontent.com/Harvard-Coding-Boot-Camp/hu-cam-fsf-pt-09-2019-u-c/blob/master/Week_15/01-Activities/09-Sequelize-Update-Delete/Solved/server.jsolved/server.js
    // GET route for getting all of the todos
    app.get("/api/todos", function (req, res) {
        // findAll returns all entries for a table when used with no options
        db.Todo.findAll({}).then(function (dbTodo) {
            // We have access to the todos as an argument inside of the callback function
            res.json(dbTodo);
        });
    });
    // POST route for saving a new todo
    app.post("/api/todos", function (req, res) {
        // create takes an argument of an object describing the item we want to
        // insert into our table. In this case we just we pass in an object with a text
        // and complete property
        db.Todo.create({
            userSuggestion: req.body.userSuggestion,
            complete: req.body.complete
        }).then(function (dbTodo) {
            // We have access to the new todo as an argument inside of the callback function
            res.json(dbTodo);
        });
    });
    // DELETE route for deleting todos. We can get the id of the todo to be deleted from
    // req.params.id
    app.delete("/api/todos/:id", function (req, res) {
        // We just have to specify which todo we want to destroy with "where"
        db.Todo.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbTodo) {
            res.json(dbTodo);
        });
    });
    // PUT route for updating todos. We can get the updated todo data from req.body
    app.put("/api/todos", function (req, res) {
        // Update takes in an object describing the properties we want to update, and
        // we use where to describe which objects we want to update
        db.Todo.update({
            userSuggestion: req.body.userSuggestion,
            complete: req.body.complete
        }, {
            where: {
                id: req.body.id
            }
        }).then(function (dbTodo) {
            res.json(dbTodo);
        });
    });

}; //End of Modules Export