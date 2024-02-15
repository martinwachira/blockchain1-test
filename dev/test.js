const Blockchain = require("./blockchain");

const bitcoin = new Blockchain();

bitcoin.createNewBlock(340, "783463VJHDSF3", "DJ0DSF23WE330");

bitcoin.createNewTransaction(20, "test-sender", "test-recipient");

bitcoin.createNewBlock(1110, "PLC3240SFSDD", "99JDSF82R323D");

bitcoin.createNewTransaction(65, "test-sender1", "test-recipient1");
bitcoin.createNewTransaction(76, "test-sender1", "test-recipient1");
bitcoin.createNewTransaction(100, "test-sender1", "test-recipient1");

bitcoin.createNewBlock(8546, "DSJHFWR23WSDF", "3894HFNEJDSDF3");

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
const nonce = 234234;

console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));
