const cookieSession = require('cookie-session')
const path = require("path");
const express = require("express");
const app = express();
const passport = require("./passport/index.js");
const auth_routes = require("./routes/auth_routes.js");
const all_routes = require("./routes/all_routes.js");
const PORT = process.env.PORT || 8080;

const authCheck = (req, res, next) => {
    console.log("authcheck")
    console.log(req.user)
    if (req.user) next();
};

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

app.get("/users", authCheck, all_routes);
app.get( `/*`, (req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieSession({
  name: 'session',
  secret: "34234"
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", auth_routes);


app.listen(PORT, () => console.log(`Server started on ${PORT}`));

module.exports = app;

// add loading screens
