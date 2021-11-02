const pool = require("../db.js");

exports.get_users = async function(req, res, next) {
    const result_users = await pool.query(`SELECT c.*, COUNT(e.*) as now1, COUNT(CASE WHEN c.id = ANY(e.dolasci) AND extract(YEAR FROM e.datum) = extract(YEAR FROM now()) AND extract(MONTH FROM e.datum) = extract(MONTH FROM now()) THEN 1 END) as last2 FROM clanovi AS c
                                            LEFT JOIN eventi AS e
                                                ON c.id = ANY(e.dolasci) 
                                            GROUP BY c.id
                                            `)
    const result_events = await pool.query("SELECT * FROM eventi")
    result_events.rows.forEach(event => {
        event.datum = event.datum.toISOString().substring(0,10)
    })
    return res.status(200).json([result_users.rows, result_events.rows])
}

exports.get_userform = async function(req, res, next) {
    const result = await pool.query("SELECT * FROM clanovi WHERE id=$1", [req.body.id])

    return res.status(200).json(result.rows[0])
}

exports.get_userdetails = async function(req, res, next) {
    const result = await pool.query(`SELECT c.*, json_agg(e.*) FROM clanovi AS c 
                                     LEFT JOIN eventi AS e
                                        ON c.id = ANY(dolasci)
                                     WHERE c.id=$1
                                     GROUP BY c.id`, [req.body.id])
                                     
    return res.status(200).json(result.rows[0])
}

exports.create_user = function(req, res, next) {

    const { ime, prezime, datum, spol, razina, email, tel, tim } = req.body

    pool.query(`INSERT INTO clanovi (ime, prezime, datum, spol, razina, email, tel, tim) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, 
                [ime, prezime, datum, spol, razina, email, tel, tim])
                
    return res.status(200).json()
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
    pool.query("UPDATE eventi SET dolasci = array_remove(dolasci, $1)", [req.body.user_id])
    pool.query("DELETE FROM clanovi WHERE id=$1", [req.body.user_id])
   
    return res.status(200).json()
}
