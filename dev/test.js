const Blockchain = require("./blockchain");

const bitcoin = new Blockchain();

bitcoin.createNewBlock(2436, "N0QE73254HWSF", "DJ0DSF23WE330");
bitcoin.createNewBlock(340, "783463VJHDSF3", "DJ0DSF23WE330");
bitcoin.createNewBlock(1110, "PLC3240SFSDD", "99JDSF82R323D");

bitcoin.createNewTransaction(20, "test-sender", "test-recipient");

console.log("bitcoin = ", bitcoin);
