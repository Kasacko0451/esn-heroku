const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres" || process.env.user,
  password: "g2esportslec12" || process.env.password,
  host: "localhost" || process.env.host,
  port: 5432 || process.env.port,
  database: "esnproto" || process.env.database,
});

module.exports = pool;
