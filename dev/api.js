var express = require("express");
var app = express();

app.get("/blockchain", function (req, res) {});

app.post("/transaction", function (req, res) {});

app.get("/mine", function (req, res) {});

app.listen(3300, function () {
  console.log("Listening port 3300...");
});
