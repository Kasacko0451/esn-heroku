const pool = require("../db.js");
var format = require('pg-format');

exports.get_events = async function(req, res, next) {
    const result = await pool.query("SELECT * FROM eventi")
    return res.status(200).json(result.rows)
}

exports.get_eventdetails = async function(req, res ,next) {
    const result = await pool.query(`SELECT e.*, json_agg(c.*) FROM eventi AS e 
                                     LEFT JOIN dolasci AS d
                                        ON d.event_id = $1
                                     LEFT JOIN clanovi AS c
                                        ON c.id = d.clan_id
                                     WHERE e.id =$1
                                     GROUP BY e.id`, [req.body.id])
                                     
    return res.status(200).json(result.rows[0])
}

exports.get_eventform = async function(req, res, next) {

    const result = await pool.query(`SELECT e.*, json_agg(d.clan_id) FROM eventi AS e 
                                    LEFT JOIN dolasci AS d 
                                        ON d.event_id=$1 
                                    WHERE e.id=$1
                                    GROUP BY e.id`, [req.body.id])

    return res.status(200).json(result.rows[0])
}

exports.create_event = async function(req, res, next) {
    const { ime_eventa, ime_organizatora, datum, cijena, tim } = req.body[0]
    const clanovi = req.body[1]
    const values = []
    try {

        const result = await pool.query(`INSERT INTO eventi (ime_eventa, ime_organizatora, datum, cijena, tim) 
                                         VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
                                        [ime_eventa, ime_organizatora, datum, cijena, tim])

        if (clanovi.length) {    
            clanovi.forEach(e => values.push([e, result.rows[0].id]));
            
            pool.query(format('INSERT INTO dolasci (clan_id, event_id) VALUES %L', values), [])
        }

        return res.status(200).json()

    } catch (err) {
        return res.status(503).json()
    }
}

exports.update_event = function(req, res, next) {
    
    const { ime_eventa, ime_organizatora, datum, cijena, tim, id } = req.body[0]
    const clanovi = req.body[1]
    const values = []

    pool.query(`UPDATE eventi 
                SET ime_eventa=$1, ime_organizatora=$2, datum=$3, cijena=$4, tim=$5
                WHERE id=$6`, 
                [ime_eventa, ime_organizatora, datum, cijena, tim, id])

    if (clanovi.length) {
        clanovi.forEach(e => values.push([e, id]));
    }

    pool.query("DELETE FROM dolasci WHERE event_id=$1", [id], function (err, result) {

        if (values.length) {
            pool.query(format('INSERT INTO dolasci (clan_id, event_id) VALUES %L', values), [])
        }
    })

    return res.status(200).json()
}

exports.delete_event = function(req, res, next) {
    pool.query("DELETE FROM dolasci WHERE event_id=$1", [req.body.id], function (err, result) {
        pool.query("DELETE FROM eventi WHERE id=$1", [req.body.id])
    })
    return res.status(200).json()
}
