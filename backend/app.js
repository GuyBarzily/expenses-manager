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
  const exists = await User.find(search).select("email");
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

async function addExpense(incomeData) {
  const email = incomeData.userData;
  const push = await User.updateOne(
    { email: email },
    { $push: { expenses: incomeData } }
  );
  return push;
}

async function addIncome(incomeData) {
  const email = incomeData.userData;
  const push = await User.updateOne(
    { email: email },
    { $push: { incomes: incomeData } }
  );
  return push;
}

async function getFinancial(email) {
  const income = await User.findOne(email).select("incomes expenses");
  const incomeArray = income.incomes;
  const expenesArray = income.expenses;
  const financial = {
    income: incomeArray,
    expenses: expenesArray,
  };
  return financial;
}

async function deleteRow(rowId) {
  const time = {
    time: rowId.rowId,
  };
  const type = rowId.type;
  if (type === "expenses") {
    const row = await User.updateOne(
      { email: rowId.email },
      { $pull: { expenses: time } }
    );
  } else {
    const row = await User.updateOne(
      { email: rowId.email },
      { $pull: { incomes: time } }
    );
  }
}

async function getUsers() {
  const users = await User.find().select("email createdAt");

  return users;
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

  const allow = await allowAccess(user);
  res.send(allow);
  console.log(userData);
});

app.post("/add-expense", async (req, res) => {
  const expense = req.body;
  const result = await addExpense(expense);
  res.send(result);
});

app.post("/add-income", async (req, res) => {
  const income = req.body;
  const result = await addIncome(income);
  res.send(result);
});

app.post("/all-financial", async (req, res) => {
  const email = req.body;
  const result = await getFinancial(email);
  res.send(result);
});
app.post("/delete", async (req, res) => {
  const data = req.body;
  deleteRow(data);
});

/* ================================================== */

/* ===============  app.get    ==================== */

app.get("/users", async (req, res) => {
  console.log(req);
  const result = await getUsers();
  console.log(result);
  res.send(result);
});

/* ================================================== */

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
