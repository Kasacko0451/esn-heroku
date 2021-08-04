const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db.js");

const loginStrategy = new LocalStrategy( async (username, password, done) => {
    pool.connect()

    const res_user = await pool.query("SELECT * FROM users WHERE username=$1", [username])
    console.log(res_user.rows, "heloooooooooooo")
    if (!res_user.rows[0]) return done("Username or password not valid", null);

    if (password !== res_user.rows[0].password) return done("Username or password not valid", null);
    pool.end()
    return done(null, res_user.rows[0].username)
});

module.exports = loginStrategy;
