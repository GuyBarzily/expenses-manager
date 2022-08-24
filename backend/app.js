const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const { useTransition } = require("react");

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://expenes:1234@cluster0.lwk4u6d.mongodb.net/expense-manager?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("connected"))
  .catch((err) => console.log(err));

/* =========  async mongoose functions   ============ */

async function addUser(user) {
  console.log("inside add");
  const search = {
    email: user.email,
  };
  const exists = await User.find(search);
  if (exists.length == 0) {
    try {
      const result = await user.save();
      return "created";
    } catch (err) {
      console.log(err);
      return "error";
    }
  } else {
    return "exists";
  }
}

async function allowAccess(user) {
  const exists = await User.find(user);
  if (exists.length > 0) return true;
  else return false;
}

async function addExpense() {
  let expense = {
    amount: "100",
    currency: "$",
  };
  const push = await User.updateOne(
    { email: "guybarzily@gmail.com" },
    { $push: { expenses: expense } }
  );
  return push;
}

/* ================================================== */

/* ===============  app.post    ==================== */

app.post("/user", async (req, res) => {
  const userdata = req.body;
  const user = new User({
    firstName: userdata.firstName,
    lastName: userdata.lastName,
    email: userdata.email,
    password: userdata.password,
    expenses: [],
  });
  const exists = await addUser(user);
  res.send(exists);
});

app.post("/sign-in", async (req, res) => {
  const userData = req.body;
  const user = {
    email: userData.email,
    password: userData.password,
  };
  const result = await addExpense();
  console.log(result);

  const allow = await allowAccess(user);
  res.send(allow);
  console.log(userData);
});

app.post("add-expense", async (req, res) => {
  const result = await addExpense();
  res.send(result);
});

/* ================================================== */

/* ===============  app.get    ==================== */

/* ================================================== */

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
