const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://expenes:1234@cluster0.lwk4u6d.mongodb.net/expense-manager?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("connected"))
  .catch((err) => console.log(err));

   /* =========  async mongoose functions   ============ */ 
        

  /* =========  async mongoose functions   ============ */ 





  /* =========  mongooseTemplates   ============ */

app.get("/add-user", (req, res) => {
  const user = new User({
    firstName: "Guy14",
    lastName: "Barzily",
    email: "..@gmail",
    password: "111",
  });

  user
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/all-users", (req, res) => {
  User.find()
    .then((result) => {
      res.send(result);
      console.log(result);
    })
    .catch((err) => console.log(err));
});

app.get("/single-user", (req, res) => {
  User.findById("6306127227820f84736231e5")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});


 /* =========  mongooseTemplates   ============ */

app.post("/user", (req, res) => {
  console.log("inside post ");
  const userdata = req.body;
  res.send("true");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
