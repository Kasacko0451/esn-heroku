const pool = require("../db.js");

exports.get_users = async function(req, res, next) {
    const result = await pool.query("SELECT * FROM clanovi")
    return res.status(200).json(result.rows)
}

exports.get_userform = async function(req, res, next) {
    const result = await pool.query("SELECT * FROM clanovi WHERE id=$1", [req.body.id])
    return res.status(200).json(result.rows[0])
}

exports.get_userdetails = async function(req, res, next) {
    const result = await pool.query(`SELECT c.*, json_agg(e.*) FROM clanovi AS c 
                                     LEFT JOIN dolasci AS d
                                        ON d.clan_id = $1
                                     LEFT JOIN eventi AS e
                                        ON e.id = d.event_id
                                     WHERE c.id =$1
                                     GROUP BY c.id`, [req.body.id])
    return res.status(200).json(result.rows[0])
}

exports.create_user = function(req, res, next) {
    const { ime, prezime, datum, spol, razina, email, tel, tim } = req.body
    try {
        pool.query(`INSERT INTO clanovi (ime, prezime, datum, spol, razina, email, tel, tim) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, 
                    [ime, prezime, datum, spol, razina, email, tel, tim])
        return res.status(200).json()
    } catch (err) {
        return res.status(503).json()
    }
}

exports.update_user = function(req, res, next) {
    const { ime, prezime, datum, spol, razina, email, tel, tim, id } = req.body
    pool.query(`UPDATE clanovi 
                SET ime=$1, prezime=$2, datum=$3, spol=$4, razina=$5, email=$6, tel=$7, tim=$8
                WHERE id=$9`, 
                [ime, prezime, datum, spol, razina, email, tel, tim, id])
    return res.status(200).json()
}

exports.delete_user = function(req, res, next) {
    pool.query("DELETE FROM dolasci WHERE clan_id=$1", [req.body.id], function (err, result) {
        pool.query("DELETE FROM clanovi WHERE id=$1", [req.body.id])
    })
    return res.status(200).json()
}
