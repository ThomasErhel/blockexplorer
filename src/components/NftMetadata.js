import React, { useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function NftMetadata() {
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [metadata, setMetadata] = useState(null);

  async function fetchMetadata(e) {
    e.preventDefault();

    const fetchedMetadata = await alchemy.core.getTokenMetadata(
      contractAddress,
      tokenId
    );
    setMetadata(fetchedMetadata);
  }

  return (
    <div className="container">
      <h2>NFT Metadata</h2>
      <form onSubmit={fetchMetadata}>
        <label>
          Contract Address:
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          />
        </label>
        <label>
          Token ID:
          <input
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
        </label>
        <button type="submit">Fetch Metadata</button>
      </form>
      {metadata ? (
        <pre>{JSON.stringify(metadata, null, 2)}</pre>
      ) : (
        <p>Enter contract address and token ID to fetch metadata.</p>
      )}
    </div>
  );
}

export default NftMetadata;
