const express = require("express");
const path = require("path");
const app = express();
const port = 5000;


// Static Files
app.use(express.static("static"));
console.log(__dirname);

const viewPath = path.join(__dirname,"/static/views");
console.log(viewPath);
// Specific folder example
//app.use("/css", express.static(__dirname + "static/css"));
//app.use("/html", express.static(__dirname + "static/html"));
//app.use("/public", express.static(__dirname + "static/public"));

// Set View's
 app.set('views', viewPath);
 app.set('view engine', "hbs");

 app.get("/",(req,res)=>
 {
  res.render('index');
 });
 
app.get("/Register", (req, res) => {
  res.render("Register");
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

app.listen(port, () => console.info(`App listening on port ${port}`));
