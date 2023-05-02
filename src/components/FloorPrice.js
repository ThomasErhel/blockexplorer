import { useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function FloorPrice() {
  const [contractAddress, setContractAddress] = useState("");
  const [floorPrice, setFloorPrice] = useState(null);

  async function fetchFloorPrice() {
    if (contractAddress) {
      const result = await alchemy.nft.getFloorPrice(contractAddress);
      setFloorPrice(result);
    } else {
      alert("Please enter a contract address");
    }
  }

  return (
    <div className="container">
      <h1>NFT Floor Price</h1>
      <input
        type="text"
        placeholder="Enter contract address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <button onClick={fetchFloorPrice}>Get Floor Price</button>
      {floorPrice && (
        <div>
          <h2>Floor Price:</h2>
          <p>{floorPrice} ETH</p>
        </div>
      )}
    </div>
  );
}

export default FloorPrice;
