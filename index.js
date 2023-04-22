const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

// Static Files
app.use(express.static("static"));
console.log(__dirname);
// Specific folder example
//app.use("/css", express.static(__dirname + "static/css"));
//app.use("/html", express.static(__dirname + "static/html"));
//app.use("/public", express.static(__dirname + "static/public"));

// Set View's
// app.set('views', './views');
// app.set('view engine', 'ejs');

// Navigation
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname + "/static/html" });
});
app.get("/Register", (req, res) => {
  res.sendFile("Register.html", { root: __dirname + "/static/html" });
});
app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: __dirname + "/static/html" });
});
app.get("/Error", (req, res) => {
  res.sendFile("Error.html", { root: __dirname + "/static/html" });
});
app.get("/pricing", (req, res) => {
  res.sendFile("pricing.html", { root: __dirname + "/static/html" });
});
app.get("/PrivacyPolicy", (req, res) => {
  res.sendFile("PrivacyPolicy.html", { root: __dirname + "/static/html" });
});
app.get("/contact", (req, res) => {
  res.sendFile("contact.html", { root: __dirname + "/static/html" });
});
app.get("/RememberPassword", (req, res) => {
  res.sendFile("RememberPassword.html", { root: __dirname + "/static/html" });
});
app.get("/AboutUs", (req, res) => {
  res.sendFile("AboutUs.html", { root: __dirname + "/static/html" });
});
app.listen(port, () => console.info(`App listening on port ${port}`));
