const Blockchain = require("./blockchain");

// inits an instance of the blockchain constructor
const bitcoin = new Blockchain();

const bc1 = {
  chain: [
    {
      index: 1,
      timestamp: 1715258008895,
      transactions: [],
      nonce: 1,
      hash: "0",
      previousBlockHash: "0",
    },
    {
      index: 2,
      timestamp: 1715258024401,
      transactions: [
        {
          amount: 40,
          sender: "DJBGJDHFBGJDFG89374958WEF34",
          recipient: "DKLVJDFBJVEFUT8374R834345DFB",
          transactionId: "a983bee1127643909098cf38e6a1eb32",
        },
        {
          amount: 50,
          sender: "DJBGJDHFBGJDFG89374958WEF34",
          recipient: "DKLVJDFBJVEFUT8374R834345DFB",
          transactionId: "c95b791b0d7943e5a27cd7b2ec2b3efe",
        },
        {
          amount: 60,
          sender: "DJBGJDHFBGJDFG89374958WEF34",
          recipient: "DKLVJDFBJVEFUT8374R834345DFB",
          transactionId: "1fff989545874b319e72e6105a2be1f5",
        },
      ],
      nonce: 137680,
      hash: "0000c4049af9f2203d4fd178a66924fcb459d6abc5754115e07148b3325ca112",
      previousBlockHash: "0",
    },
    {
      index: 3,
      timestamp: 1715258034382,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          transactionId: "99d91c143cb542df9ddf4c3ee8d6fcda",
        },
        {
          amount: 10,
          sender: "DJBGJDHFBGJDFG89374958WEF34",
          recipient: "DKLVJDFBJVEFUT8374R834345DFB",
          transactionId: "05d7f43f0f3e471b8268840bee1ab67c",
        },
        {
          amount: 20,
          sender: "DJBGJDHFBGJDFG89374958WEF34",
          recipient: "DKLVJDFBJVEFUT8374R834345DFB",
          transactionId: "f004ce15161c4159b0376b050796f128",
        },
      ],
      nonce: 127916,
      hash: "0000da53706fd707a45b27af4779438a0cf5a98a2889933d30f34257d96cecf4",
      previousBlockHash:
        "0000c4049af9f2203d4fd178a66924fcb459d6abc5754115e07148b3325ca112",
    },
    {
      index: 4,
      timestamp: 1715258036573,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          transactionId: "0d5d32b4bbb04ed0bb5449720f5469da",
        },
      ],
      nonce: 608375,
      hash: "0000d4ec7bfc9270f0ebe076fbaee45c7e797ccaef6df6d431ab5d0b70b4f145",
      previousBlockHash:
        "0000da53706fd707a45b27af4779438a0cf5a98a2889933d30f34257d96cecf4",
    },
    {
      index: 5,
      timestamp: 1715258037194,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          transactionId: "41bd735408654015be53a09dc21138ae",
        },
      ],
      nonce: 4643,
      hash: "00004a04d61e863c1769f829b9a492cc14af6852208fb745cf68a6ad40f1804f",
      previousBlockHash:
        "0000d4ec7bfc9270f0ebe076fbaee45c7e797ccaef6df6d431ab5d0b70b4f145",
    },
  ],
  pendingTransactions: [
    {
      amount: 12.5,
      sender: "00",
      transactionId: "563631fcfe2441119657193dc229b2fe",
    },
  ],
  currentNodeUrl: "http://localhost:3001",
  networkNodes: [],
};

console.log("isValid: ", bitcoin.chainIsValid(bc1.chain));
