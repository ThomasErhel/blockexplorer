import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function BlockDetails() {
  const { blockNumber } = useParams();
  const [block, setBlock] = useState(null);

  useEffect(() => {
    async function fetchBlockDetails() {
      const blockNumberHex = "0x" + parseInt(blockNumber).toString(16);
      const blockWithTransactions = await alchemy.core.getBlockWithTransactions(
        blockNumberHex
      );
      setBlock(blockWithTransactions);
    }

    fetchBlockDetails();
  }, [blockNumber]);

  return (
    <div className="container">
      <h1>Block Details</h1>
      {block ? (
        <table>
          <tbody>
            <tr>
              <th>Block Number</th>
              <td>{block.number}</td>
            </tr>
            <tr>
              <th>Block Hash</th>
              <td>{block.hash}</td>
            </tr>
            <tr>
              <th>Parent Hash</th>
              <td>{block.parentHash}</td>
            </tr>
            <tr>
              <th>Nonce</th>
              <td>{block.nonce}</td>
            </tr>
            <tr>
              <th>Gas Limit</th>
              <td>{block.gasLimit.toString()}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading block details...</p>
      )}
      <h2>Transactions</h2>
      <ul>
        {block &&
          block.transactions.map((transaction) => (
            <li key={transaction.hash}>
              <Link to={`/transaction/${transaction.hash}`}>
                Transaction Hash: {transaction.hash}
              </Link>
            </li>
          ))}
      </ul>
      <Link to="/">Back to Block List</Link>
    </div>
  );
}

export default BlockDetails;
