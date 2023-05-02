import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function BlockList() {
  const [blockNumbers, setBlockNumbers] = useState([]);

  useEffect(() => {
    async function fetchBlockNumbers() {
      const currentBlockNumber = await alchemy.core.getBlockNumber();
      const recentBlockNumbers = Array.from(
        { length: 10 },
        (_, i) => currentBlockNumber - i
      );
      setBlockNumbers(recentBlockNumbers);
    }

    fetchBlockNumbers();
  }, []);

  return (
    <div className="container">
      <h1>Recent Blocks</h1>
      <ul>
        {blockNumbers.map((blockNumber) => (
          <li key={blockNumber}>
            <Link to={`/block/${blockNumber}`}>
              Block Number: {blockNumber}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlockList;
