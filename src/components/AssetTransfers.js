import React, { useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function AssetTransfers() {
  const [address, setAddress] = useState("");
  const [startTimestamp, setStartTimestamp] = useState("");
  const [endTimestamp, setEndTimestamp] = useState("");
  const [transfers, setTransfers] = useState([]);

  async function fetchAssetTransfers(e) {
    e.preventDefault();

    const fetchedTransfers = await alchemy.core.getAssetTransfers({
      from: startTimestamp,
      to: endTimestamp,
      address: address,
    });

    setTransfers(fetchedTransfers.transfers);
  }

  return (
    <div className="container">
      <h2>Asset Transfers</h2>
      <form onSubmit={fetchAssetTransfers}>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          Start Timestamp:
          <input
            type="text"
            value={startTimestamp}
            onChange={(e) => setStartTimestamp(e.target.value)}
          />
        </label>
        <label>
          End Timestamp:
          <input
            type="text"
            value={endTimestamp}
            onChange={(e) => setEndTimestamp(e.target.value)}
          />
        </label>
        <button type="submit">Fetch Asset Transfers</button>
      </form>
      {transfers.length > 0 ? (
        <ul>
          {transfers.map((transfer, index) => (
            <li key={index}>
              {transfer.asset.token_symbol}: {transfer.value} from{" "}
              {transfer.from_address} to {transfer.to_address}
            </li>
          ))}
        </ul>
      ) : (
        <p>
          Enter an address and a start and end timestamp to fetch asset
          transfers.
        </p>
      )}
    </div>
  );
}

export default AssetTransfers;
