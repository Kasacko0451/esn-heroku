const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db.js");

const loginStrategy = new LocalStrategy( async (username, password, done) => {
 
    const client = await pool.connect()

    const res_user = await client.query("SELECT * FROM users WHERE username=$1", [username])
    .then(() => {
        console.log("closed pool")
        pool.end();
    })
    console.log("login", res_user.rows)
    if (!res_user.rows[0]) return done("Username or password not valid", null);

    if (password !== res_user.rows[0].password) return done("Username or password not valid", null);

    return done(null, res_user.rows[0].username)
});

module.exports = loginStrategy;
