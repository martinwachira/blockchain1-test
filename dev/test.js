const Blockchain = require("./blockchain");

const bitcoin = new Blockchain();

bitcoin.createNewBlock(340, "783463VJHDSF3", "DJ0DSF23WE330");

bitcoin.createNewTransaction(20, "test-sender", "test-recipient");

bitcoin.createNewBlock(1110, "PLC3240SFSDD", "99JDSF82R323D");

bitcoin.createNewTransaction(65, "test-sender1", "test-recipient1");
bitcoin.createNewTransaction(76, "test-sender1", "test-recipient1");
bitcoin.createNewTransaction(100, "test-sender1", "test-recipient1");

bitcoin.createNewBlock(8546, "DSJHFWR23WSDF", "3894HFNEJDSDF3");

console.log(bitcoin.chain[2]);
