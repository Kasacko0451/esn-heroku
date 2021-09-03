const passport = require("../passport/index.js")
const pool = require("../db.js");

exports.login = function(req, res, next) {
    passport.authenticate("local-login", function(error, user, info) {
        if(error) {
          return res.status(500).json({
            message: error
          });
        }
        req.logIn(user, function(error){
          if(error) {
            return res.status(500).json({
              message: "Fail"
            });
          }
          return res.json(user)
        })
    })(req, res, next);
}

exports.logout = async function(req, res, next) {
  await req.logout();
  pool.query("DELETE FROM session WHERE sid=$1", [req.sessionID], async function() {
      const result = await pool.query("SELECT * FROM session")
      console.log(result)
  })
  req.session = null
  return res.status(200).json()
}

exports.islog = function(req, res, next) {
  if (req.user) return res.status(200).json(req.user.username) 
  else return res.status(200).json(false) 
}
