const Blockchain = require("./blockchain");
const express = require("express");
const bodyParser = require("body-parser");
const { uuid } = require("uuidv4");
const port = process.argv[2];

const app = express();
const bitcoin = new Blockchain();
const nodeAddress = uuid().split("-").join("");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ encoded: false }));
app.get("/blockchain", function (req, res) {
  console.log("port", port);
  res.send(bitcoin);
});

app.post("/transaction", function (req, res) {
  const blockIndex = bitcoin.createNewTransaction(
    req.body.amount,
    req.body.sender,
    req.body.recipient
  );
  // console.log(req.body);
  // res.send(`amount of transaction is ${req.body.amount} bitcoins`);
});

app.get("/mine-block", function (req, res) {
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock["hash"];
  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock["index"] + 1,
  };
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = bitcoin.hashBlock(
    previousBlockHash,
    currentBlockData,
    nonce
  );

  bitcoin.createNewTransaction(12.5, "00", nodeAddress);
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
  res.send({ note: "New block mined successfully", block: newBlock });
});

//register and broadcast a node on the network
app.post("/register-broadcast-node", function (req, res) {
  const newNodeUrl = req.body.newNodeUrl;
});

//register node on the network
app.post("/register-node", function (req, res) {});

//registers multiple nodes on the network at once
app.post("/register-nodes-bulk", function (req, res) {});

app.listen(port, function () {
  console.log(`Listening port ${port}...`);
});
