const cookieSession = require('cookie-session')
const path = require("path");
const express = require("express");
const app = express();
const passport = require("./passport/index.js");
const auth_routes = require("./routes/auth_routes.js");
const all_routes = require("./routes/all_routes.js");
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

const authCheck = (req, res, next) => {
    console.log("authcheck")
    console.log(req.user)
    if (req.user) next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieSession({
  name: 'session',
  keys: ["k5e32y1","2ke5y2","k4e3y3","ke3y44"]
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", auth_routes);
app.use("/users", authCheck, all_routes);

app.get( `/*`, (req, res, next) => {
    console.log("getttttt")
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

module.exports = app;

// add loading screens
