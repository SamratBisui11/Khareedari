const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./src/mongodb");
const mongoose = require("mongoose");

const templatePath = path.join(__dirname, './templates');

app.use(express.urlencoded({ extended: false })); // Parse form data
app.use(express.static('public'));
app.set("view engine", "hbs");
app.set("views", templatePath);
mongoose.connect("mongodb+srv://samrat11022002:7DwDg6MqxQH6cR8B@cluster0.w9j23uy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
  console.log("mongodb connected");
  app.listen(3000, function () {
    console.log("port 3000 is running");
  });
  
});

app.get("/", function (req, res) {
  res.render("login");    
});

app.get("/signup", function (req, res) {
  res.render("signup");
});
app.get('/home', (req,res)=>{
res.send('Hello Home');
});
app.post("/login",async function(req,res){
 const user= await collection.find({name:req.username});
 if(!user){
  return res.send("User not found");
 }
 if(user.password!= req.password){
  return res.send("User password not found");
 }
 res.render("home");
});


app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password
  };
console.log(data);
  await collection.insertMany([data]);

  return res.redirect("/home"); 
});

