import React, { useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function TransactionMinedStatus() {
  const [txHash, setTxHash] = useState("");
  const [transactionReceipt, setTransactionReceipt] = useState(null);

  async function checkTransactionMined(e) {
    e.preventDefault();

    await alchemy.transact.subscribe(txHash);
    const receipt = await alchemy.transact.waitForTxnMined(txHash);
    setTransactionReceipt(receipt);
  }

  return (
    <div className="container">
      <h2>Transaction Mined Status</h2>
      <form onSubmit={checkTransactionMined}>
        <label>
          Transaction Hash:
          <input
            type="text"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
          />
        </label>
        <button type="submit">Check Mined Status</button>
      </form>
      {transactionReceipt ? (
        <p>Transaction {txHash} has been mined.</p>
      ) : (
        <p>Enter a transaction hash to check its mined status.</p>
      )}
    </div>
  );
}

export default TransactionMinedStatus;
