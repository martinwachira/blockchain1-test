const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ encoded: false }));

app.get("/blockchain", function (req, res) {});

app.post("/transaction", function (req, res) {
  console.log(req.body);
  res.send(`amount of transaction is ${req.body.amount} bitcoins`);
});

app.get("/mine", function (req, res) {});

app.listen(3300, function () {
  console.log("Listening port 3300...");
});
