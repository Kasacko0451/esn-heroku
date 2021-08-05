const cookieSession = require("cookie-session")
const path = require("path");
const express = require("express");
const app = express();
const passport = require("./passport/index.js");
const auth_routes = require("./routes/auth_routes.js");
const all_routes = require("./routes/all_routes.js");
const pool = require("./db.js");
const PORT = process.env.PORT || 8080;

pool.connect()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({
    name: 'session',
    keys: ['ke45y1', 'key342'],
    secret: "secrfdsfs"
}))

app.use(passport.initialize());
app.use(passport.session());

const authCheck = (req, res, next) => {
  if (req.user) next();
};

app.use("/auth", auth_routes);
app.use("/api", authCheck, all_routes);

app.use(express.static(path.join(__dirname, "build")));

app.get( `*`, (req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

module.exports = app;
