// Need to require the keys.js file and .env wherever you need the keys
// .env need to be set up per environment.
// Need to modify config.json file along with information exported from this file.
console.log('keys.js is loaded');

exports.dbinfo = {
    db_pass: process.env.DB_PASS,
};