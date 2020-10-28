require("dotenv").config();
const config = require("../config.json");

const BORROWERS = [
  "0x2ef869f0350b57d53478d701e3fee529bc911c75",
  "0xea3c266499f31a38d143d242f7ca51e7ca0d216d",
  "0x618393681b935903a026abaead738d70ddbd2ed1",
  "0xc6647c33187760a2f79109ebb4790763ad7229e4"
];
const REPAY = [
  "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5",
  "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5",
  "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5",
  "0xc11b1268c1a384e55c48c2391d8d480264a3a7f4"
];
const SEIZE = [
  "0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407",
  "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643",
  "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643",
  "0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e"
];
// If the following 3 arrays are non-empty, prices will be posted
const MESSAGES = [
  "0x0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000005f8cf79400000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000002ab7ed2b00000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034254430000000000000000000000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000005f8cf79400000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000165f3be00000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034554480000000000000000000000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000005f8cf17c00000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000f65330000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034441490000000000000000000000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000005f8cf62c00000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000cfd3200000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035245500000000000000000000000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000005f8cf75800000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000005e90c0000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035a52580000000000000000000000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000005f8cf71c00000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000339310000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034241540000000000000000000000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000005f8cf79400000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000062c5a50000000000000000000000000000000000000000000000000000000000000000670726963657300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004434f4d5000000000000000000000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000005f8cf79400000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000311ca8000000000000000000000000000000000000000000000000000000000000000670726963657300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003554e490000000000000000000000000000000000000000000000000000000000"
]
const SIGNATURES = [
  "0x2f825a4dd862b282a00f61326e849adf5261aa724ce7bd2d0bd8d2e36e795fd4903544063ae5a69b66b8c0dfd4f89d06fe89334980817a098e7bf77b775f746d000000000000000000000000000000000000000000000000000000000000001b",
  "0xd3146c7f0965c158229bae86608fee25974c1510e940d1924cfa1adf84b63c1b46a183024ce5a2209ab433bf44357acc45b8430aa2f698036ed6b0e3eb8936a5000000000000000000000000000000000000000000000000000000000000001c",
  "0x27ca46110c8f81688153f0c59da1896478f2e431afbcb7b894f7e9b634313eca20e524e3177890c0b8d3cba31dc4484a7187523417f2d255a73ba87a22f2b1aa000000000000000000000000000000000000000000000000000000000000001c",
  "0x4afd5f6feff3cb1591c788c8ffb0f8696220cc183eecffc4cac0a773832d73093a883adb4f51fbd60abade08889fd94fdeb2b21884218a3769671dd62658d884000000000000000000000000000000000000000000000000000000000000001c",
  "0xd54d535417dda3d9feb07eca967f14d4cb29ab0d0cdfd02812700981f67fcc33a2cc68a4ae918bea402f88c45478996ee656a02dcb8282a5a416af913ec92f4b000000000000000000000000000000000000000000000000000000000000001b",
  "0x32d144f88d0f8bb34763b4a21d1c06bcc28e74bf7fafa076dd363b78206eb0654c87cb62305cecedf2d51b8dbd2be0ce725b51cbad4c82c95a236d1c96977251000000000000000000000000000000000000000000000000000000000000001b",
  "0xaa8aa1e0623583154a9629616a80245a66866b311bab971b0aa76297f4f480e62318456f93aace5db7237db04a39579db3044e0a8a97070a43ba04969a43b950000000000000000000000000000000000000000000000000000000000000001b",
  "0x1547ce4f2eda3e63f7426f8bbf7e1792b271afbf204a722369a539ef79a037021a1d91a12280c0c42d7cb6b211629f38d3bae6e48104166f1efc597d17389cfc000000000000000000000000000000000000000000000000000000000000001b"
]
const SYMBOLS = ["BTC", "ETH", "DAI", "REP", "ZRX", "BAT", "COMP", "UNI"];

// configure web3
const { MultiSendProvider } = require("../src/network/webthree/providers");
let web3 = new MultiSendProvider(config.network.name, config.network.providers);

//-------------------------------- comment out this block to disable ganache
const Web3 = require("web3");
const ganache = require("ganache-cli");
// note that ganache does not currently support replacement transactions
web3 = new Web3(
  ganache.provider({
    port: 8546,
    fork: web3
  })
);
//-------------------------------- comment out this block to disable ganache

// configure Liquidator stuff
const Tx = require("ethereumjs-tx").Transaction;
const Web3Utils = require("web3-utils");
const Liquidator = require("../src/network/webthree/goldenage/liquidator");
const Big = require("big.js");
Big.DP = 40;
Big.RM = 0;

// create method to confirm/cancel transaction
const readline = require("readline");
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve =>
    rl.question(query, ans => {
      rl.close();
      resolve(ans);
    })
  );
}

(async () => {
  try {
    const gasPrice = Big(await web3.eth.getGasPrice());
    const nonce = await web3.eth.getTransactionCount(
      process.env.ACCOUNT_ADDRESS_TEST
    );

    let tx = Liquidator.mainnet.liquidateSN(
      BORROWERS,
      REPAY,
      SEIZE,
      gasPrice,
      false
    );
    if (MESSAGES.length != 0)
      tx = Liquidator.mainnet.liquidateSNWithPrice(
        MESSAGES,
        SIGNATURES,
        SYMBOLS,
        BORROWERS,
        REPAY,
        SEIZE,
        gasPrice,
        false
      );

    tx.from = process.env.ACCOUNT_ADDRESS_TEST;
    tx.nonce = Web3Utils.toHex(nonce);
    // If commented out, will use gasLimit provided by Liquidator.js...
    // tx.gasLimit = Web3Utils.toHex(2100000 * BORROWERS.length);
    console.log(`Gas limit is set to ${tx.gasLimit.toFixed(0)}`);
    tx.gasLimit = Web3Utils.toHex(tx.gasLimit.toFixed(0));
    tx.gasPrice = Web3Utils.toHex(tx.gasPrice.toFixed(0));

    let signedTx = new Tx(tx);
    signedTx.sign(Buffer.from(process.env.ACCOUNT_SECRET_TEST, "hex"));
    signedTx = "0x" + signedTx.serialize().toString("hex");

    console.log(tx);
    console.log(`Estimated gas usage is ${await web3.eth.estimateGas(tx)}`);
    const ans = await askQuestion(
      "Are you sure you want to send this transaction on mainnet? (Y/N) "
    );
    if (ans === "Y") {
      const res = await web3.eth.sendSignedTransaction(signedTx);
      console.log(
        res.status
          ? `Transaction successful! Used ${res.gasUsed} gas`
          : "Transaction reverted."
      );
      if ((await askQuestion("Print full log? (Y/N) ")) === "Y")
        console.log(res);
    }
  } catch (err) {
    console.log(err);
  } finally {
    web3.eth.clearSubscriptions();
    try {
      web3.currentProvider.connection.close();
    } catch {
      try {
        web3.currentProvider.connection.destroy();
      } catch {
        console.log("Ganache should shut itself down now.");
        process.exit();
      }
    }
  }
})().catch(err => console.log(err.stack));