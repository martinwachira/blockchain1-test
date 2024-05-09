const Blockchain = require("./blockchain");
const express = require("express");
const bodyParser = require("body-parser");
const { uuid } = require("uuidv4");
const port = process.argv[2];
const rp = require("request-promise");

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
  const newTransaction = req.body;
  const blockIndex =
    bitcoin.addTransactionToPendingTransactions(newTransaction);
  res.send({ note: `Transaction will be added in block ${blockIndex}.` });
});

//create and broadcast a trans to all network nodes
app.post("/transaction/broadcast", function (req, res) {
  const newTransaction = bitcoin.createNewTransaction(
    req.body.amount,
    req.body.sender,
    req.body.recipient
  );
  bitcoin.addTransactionToPendingTransactions(newTransaction);

  //array of promises
  const reqPromises = [];
  //broadcasts the transaction
  bitcoin.networkNodes.forEach((networkNodeUrl) => {
    const reqOptions = {
      uri: networkNodeUrl + "/transaction",
      method: "POST",
      body: newTransaction,
      json: true,
    };
    reqPromises.push(rp(reqOptions));
  });
  //satisfies the promise
  Promise.all(reqPromises).then((data) => {
    res.json({
      note: "Transaction has been created and broadcasted successfully",
    });
  });
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
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

  //broadcasting the block to the entire network
  const reqPromises = [];
  bitcoin.networkNodes.forEach((networkNodeUrl) => {
    const reqOptions = {
      uri: networkNodeUrl + "/receive-new-block",
      method: "POST",
      body: { newBlock: newBlock },
      json: true,
    };
    reqPromises.push(rp(reqOptions));
  });

  // broadcasting the mine reward to the entire network
  Promise.all(reqPromises)
    .then((data) => {
      const reqOptions = {
        uri: bitcoin.currentNodeUrl + "/transaction/broadcast",
        method: "POST",
        body: { amount: 12.5, sender: "00", receipient: nodeAddress },
        json: true,
      };
      return rp(reqOptions);
    })
    .then((data) => {
      res.send({
        note: "New block mined and broadcasted successfully",
        block: newBlock,
      });
    });
});

app.post("/receive-new-block", function (req, res) {
  const newBlock = req.body.newBlock;
  const lastBlock = bitcoin.getLastBlock();
  const correctHash = lastBlock.hash === newBlock.previousBlockHash;
  const correctIndex = lastBlock["index"] + 1 === newBlock["index"];

  if (correctHash && correctIndex) {
    bitcoin.chain.push(newBlock);
    bitcoin.pendingTransactions = [];
    res.json({
      note: "New block has been received and accepted",
      newBlock: newBlock,
    });
  } else {
    res.json({ note: "New block has been rejected!", newBlock: newBlock });
  }
});

//register and broadcast a node on the network
app.post("/register-broadcast-node", function (req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1)
    bitcoin.networkNodes.push(newNodeUrl);

  const regNodesPromises = [];
  bitcoin.networkNodes.forEach((networkNodeUrl) => {
    // hit register-node endpoint
    const reqOptions = {
      uri: networkNodeUrl + "/register-node",
      method: "POST",
      body: { newNodeUrl: newNodeUrl },
      json: true,
    };
    regNodesPromises.push(rp(reqOptions));
  });
  Promise.all(regNodesPromises)
    .then((data) => {
      const bulkRegisterOptions = {
        uri: newNodeUrl + "/register-nodes-bulk",
        method: "POST",
        body: {
          allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl],
        },
        json: true,
      };
      return rp(bulkRegisterOptions);
    })
    .then((data) => {
      res.json({ note: "New node registered with network successfully" });
    });
});

//register node on the network
app.post("/register-node", function (req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  const nodeNotPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
  const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
  if (nodeNotPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);
  res.json({ note: "New node registered successfully" });
});

//registers multiple nodes on the network at once
app.post("/register-nodes-bulk", function (req, res) {
  const allNetworkNodes = req.body.allNetworkNodes;
  allNetworkNodes.forEach((networkNodeUrl) => {
    const nodeNotPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
    if (nodeNotPresent && notCurrentNode)
      bitcoin.networkNodes.push(networkNodeUrl);
  });
  res.json({ note: "Registering nodes in bulk done successfully" });
});

app.get("/consensus", function (req, res) {
  const reqPromises = [];
  bitcoin.networkNodes.forEach((networkNodeUrl) => {
    const reqOptions = {
      uri: networkNodeUrl + "/bitcoin",
      method: "GET",
      json: true,
    };
    reqPromises.push(rp(reqOptions));
  });
  Promise.all(reqPromises).then((blockchains) => {
    const currentChainLength = bitcoin.chain.length;
    const maxChainLength = currentChainLength;
    const newLongestChain = null;
    const newPendingTransactions = null;
    blockchains.forEach((Blockchain) => {
      if (bitcoin.chain.length > maxChainLength) {
        maxChainLength = blockchain.chain.length;
        newLongestChain = blockchain.chain;
        newPendingTransactions = blockchain.pendingTransactions;
      }
    });
    if (
      !newLongestChain ||
      (newLongestChain && !bitcoin.chainIsValid(newLongestChain))
    ) {
      json.res({
        note: "Current chain hasn`t been replaced",
        chain: bitcoin.chain,
      });
    } else if (newLongestChain && bitcoin.chainIsValid(newLongestChain)) {
      bitcoin.chain = newLongestChain;
      bitcoin.pendingTransactions = newPendingTransactions;
      res.json({
        note: "This chain has been replaced",
        chain: bitcoin.chain,
      });
    }
  });
});

app.listen(port, function () {
  console.log(`Listening port ${port}...`);
});
