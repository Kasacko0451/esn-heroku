const passport = require("passport");
const loginStrategy = require("./loginstrategy.js")
const pool = require("../db.js");

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(async function(username, done) {

    const client = await pool.connect()
    client.query("SELECT * FROM users WHERE username=$1", [username], function(err, result) {
        pool.end()
        done(err, result.rows[0]) 
    })
});

passport.use("local-login", loginStrategy);

module.exports = passport;
