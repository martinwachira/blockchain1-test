const Blockchain = require("./blockchain");

// inits an instance of the blockchain constructor
const bitcoin = new Blockchain();

// tests create block
bitcoin.createNewBlock(340, "783463VJHDSF3", "DJ0DSF23WE330");

//tests create transaction
bitcoin.createNewTransaction(20, "test-sender", "test-recipient");

// tests created transaction in the next created block
bitcoin.createNewBlock(1110, "PLC3240SFSDD", "99JDSF82R323D");

// tests hashing block
const previousBlockHash = "JKSDFG2486TREWFI2R42";
const currentBlockData = [
  {
    amount: 24,
    sender: "SKJDF32048E2EKJGLWR8",
    recipient: "2QWEE90238E392FEF380",
  },
  {
    amount: 100,
    sender: "34YTGDYFEWBJCF8WEF3",
    recipient: "LKAJSDT7384TFG7634",
  },
  {
    amount: 150,
    sender: "SDFG023OEODKJC86334F",
    recipient: "KJSGCBEG3YIHWJEFB83",
  },
];
// const nonce = 234234;
// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));

// tests proof of work
// console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));
// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 110401));
console.log(bitcoin);
