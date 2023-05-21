const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const sessionT = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const crypto = require("crypto");
var Session = require("express-session");
const db = require("./DbConnect");

const port = 5000;
//Session Srttings
// creating 24 hours from milliseconds
const oneMin = 5000 * 60;
//2023-05-21T06:42:32.708Z
//session middleware
app.use(Session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneMin },
    resave: false,

}));

// Static Files
app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
//for cookieparser
//console.log(__dirname);
// Email Format Checking
function Checkemail(email) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) {
    //document.form1.text1.focus();

    return true;
  } else {
    console.warn("Invalid email address!");

    //document.form1.text1.focus();

    return false;
  }
}
const viewPath = path.join(__dirname, "/static/views");
//console.log(viewPath);
// Specific folder example
//app.use("/css", express.static(__dirname + "static/css"));
//app.use("/html", express.static(__dirname + "static/html"));
//app.use("/public", express.static(__dirname + "static/public"));

// Set View's
app.set("views", viewPath);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/Register", (req, res) => {
  res.render("Register");

  //
  //res.render("Register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/Error", (req, res) => {
  res.render("Error");
});
app.get("/pricing", (req, res) => {
  res.render("pricing");
});
app.get("/PrivacyPolicy", (req, res) => {
  res.render("PrivacyPolicy");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/RememberPassword", (req, res) => {
  res.render("RememberPassword");
});
app.get("/AboutUs", (req, res) => {
  res.render("AboutUs.hbs");
});
app.post("/register", (req, res) => {
  var email = req.body.email;
  if (Checkemail(email)) {
    var password = req.body.password;
    console.log(email);
    console.log(password);
    var sql = `INSERT INTO Users ( Email, Password) VALUES ("${email}", "${password}")`;
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Row has been updated");
      res.render("login", {
        message: "Registration Complete. Please login to continue.",
        messageClass: "alert-success",
      });
    });
  }
});

app.post("/login", (req, res) => {
  if (Checkemail(req.body.email)) {
    var sql = `SELECT Password from Users where Email = "${req.body.email}"`;
    //session = req.session;
    db.query(sql, function (err, result) {
      if (err) throw err;
      if (result.Password == req.body.Password) {
        Session = req.session;
        Session.userId = req.body.Password;
        res.redirect("/contact");
      } else console.warn("Wrong cred");
    });
  }
});

app.get("/abc",(req,res)=>{
Session = req.session;
if(Session.userId && Session.cookie.maxAge)
{
  console.log(req.header.cookie);

  res.render("abc");
  
}
else
{
  res.render("login");
}
});
app.post("/abc",(req,res)=>{
  res.render("abc");
});


app.listen(port, () => console.info(`App listening on port ${port}`));
