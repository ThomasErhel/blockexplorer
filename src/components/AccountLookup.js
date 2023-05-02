import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useState } from "react";
import { Link } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function AccountLookup() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const balanceInWei = await alchemy.core.getBalance(address);
    setBalance(balanceInWei);
  };

  return (
    <div className="container">
      <h1>Account Lookup</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <button type="submit">Lookup Balance</button>
      </form>
      {balance && (
        <p>
          Balance: {balance.toString()} wei (
          {Utils.formatEther(balance).toString()} ether)
        </p>
      )}
      <Link to="/">Back to Block List</Link>
    </div>
  );
}

export default AccountLookup;
