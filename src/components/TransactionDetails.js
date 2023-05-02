import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function TransactionDetails() {
  const { hash } = useParams();
  const [transactionReceipt, setTransactionReceipt] = useState(null);

  useEffect(() => {
    async function fetchTransactionReceipt() {
      const receipt = await alchemy.core.getTransactionReceipt(hash);
      setTransactionReceipt(receipt);
    }

    fetchTransactionReceipt();
  }, [hash]);

  return (
    <div className="container">
      <h1>Transaction Details</h1>
      {transactionReceipt ? (
        <table>
          <tbody>
            <tr>
              <th>Transaction Hash</th>
              <td>{transactionReceipt.transactionHash}</td>
            </tr>
            <tr>
              <th>From</th>
              <td>{transactionReceipt.from}</td>
            </tr>
            <tr>
              <th>To</th>
              <td>{transactionReceipt.to}</td>
            </tr>
            <tr>
              <th>Block Number</th>
              <td>{transactionReceipt.blockNumber}</td>
            </tr>
            <tr>
              <th>Gas Used</th>
              <td>{transactionReceipt.gasUsed.toString()}</td>
            </tr>
            <tr>
              <th>Effective Gas Price</th>
              <td>{transactionReceipt.effectiveGasPrice.toString()}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{transactionReceipt.status}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading transaction details...</p>
      )}
      <Link to={`/block/${transactionReceipt?.blockNumber}`}>
        Back to Block Details
      </Link>
    </div>
  );
}

export default TransactionDetails;
