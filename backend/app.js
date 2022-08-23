const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const signed = [];

app.post("/user", (req, res) => {
  const user = req.body;
  console.log("user: " + user);
  console.log("signed: " + signed);
  if (signed.length === 0) {
    signed.push(user);
    setTimeout(() => {}, 1000);
  }
  for (let i = 0; i < signed.length; i++) {
    if (JSON.stringify(user) === JSON.stringify(signed[i])) {
    signed.push(user);
      res.send("true");
    } else {
      res.send("false");
      console.log(signed);
    }
  }
  signed.forEach((s) => console.log(s));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
