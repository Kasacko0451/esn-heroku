const pool = require("../db.js");

exports.get_events = async function(req, res, next) {
    const result = await pool.query("SELECT * FROM events")
    res.json(result)
}

exports.get_eventdetails = async function(req, res, next) {
    const result = await pool.query("SELECT * FROM events WHERE id=$1", [req.body.id])
    res.json(result)
}
