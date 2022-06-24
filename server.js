// load .env data into process.env
require("dotenv").config();
const database = require('./database');

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session')

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
  name: 'session',
  keys: ['ABC/@432cuas42/as'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


database.getUserWithEmail('bobS@hotmail.com')

const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "test@yahoo.ca",
    username: "testUser",
    password: "password"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "test123@gmail.ca",
    username: "userTest",
    password: "password123"
  },
}



const checkUsername = function(username, password){
  for (const key in users) {
    if (username === users[key].username){
      if (password === users[key].password){
        return true;
      }
    }
    else {
      return false;
    }
  }
}

const checkUserEmail = function (username, email){
    for (const key in users) {
      if (username === users[key].username || email === users[key].email){
        return true;
      }
    }
    return false;
}






app.get("/", (req, res) => {
  const templateVars = {};
  res.render("index",templateVars);
});


// get request for login
app.get("/login", (req, res) => {
  const templateVars = {};
  console.log("at the log in page")
  res.render("login",templateVars);
});

// post request for login
app.post("/login", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  if (checkUsername(username,password)){
    res.redirect("/");
    console.log(`Login successful!!!!!`)
    console.log(users)
  }
  else {
    res.redirect("login");
    console.log(users)
    console.log("Login failed!!!!!!")
  }


});

// get request for register
app.get("/register", (req, res) => {
  const templateVars = {};
  res.render("register",templateVars);
});

// post request for register
app.post("/register", (req, res) => {

  if (!req.body.email || !req.body.password || !req.body.username) {
    res.status(400).send("Error, Please enter all fields requierd");
  } else if (checkUserEmail(req.body.username,req.body.email)) {

    res.status(400).send("Email or username already registered");

  } else {
    let userID = "hello";
    users[userID] = {
      userID,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    };
  }
  console.log(users)
  res.redirect("/");
});

// get for profile page
app.get("/profile", (req, res) => {
  const templateVars = {};
  res.render("profile",templateVars);
});

// post request for profile page
app.post("/profile", (req, res) => {
  res.render("register");
});

// get request for settings page
app.get("/settings", (req, res) => {
  const templateVars = {};
  res.render("settings",templateVars);
});

// post request for settings page
app.post("/settings", (req, res) => {
  res.render("settings");
});


// Post to logout
app.post("/logout", (req, res) => {
  req.session.user_id = undefined; // Clears cookies, redirects to homepage.
  res.redirect("/")

});





app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});



