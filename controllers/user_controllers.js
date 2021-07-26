const pool = require("../db.js");

exports.get_users = async function(req, res, next) {
    const result = await pool.query("SELECT * FROM userprofiles")
    res.json(result)
}

exports.get_userdetails = async function(req, res, next) {
    const result = await pool.query("SELECT * FROM userprofiles WHERE id=$1", [req.body.id])
    res.json(result)
}
