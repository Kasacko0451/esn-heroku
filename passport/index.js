const passport = require("passport");
const loginStrategy = require("./loginstrategy.js")
const pool = require("../db.js");

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(username, done) {
    console.log(username)
    pool.connect()
    pool.query("SELECT * FROM users WHERE username=$1", [username], function(err, result) {
        console.log("loginindex", result.rows)
        pool.end()
        console.log("2222222222", result.rows)
        done(err, result.rows[0]) 
        console.log("3333333333", result.rows)
    })
});

passport.use("local-login", loginStrategy);

module.exports = passport;
