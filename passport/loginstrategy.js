const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db.js");

const loginStrategy = new LocalStrategy( async (username, password, done) => {
    const res_user = await pool.query("SELECT * FROM users WHERE username=$1", [username])

    if (!res_user.rows[0]) return done("Korisničko ime ili lozinka nije ispravna", null);

    if (password !== res_user.rows[0].password) return done("Korisničko ime ili lozinka nije ispravna", null);

    return done(null, res_user.rows[0].username)
});

module.exports = loginStrategy;
