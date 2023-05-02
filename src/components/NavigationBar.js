import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <nav className="navigation-bar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/account-lookup">Account Lookup</Link>
        </li>
        <li>
          <Link to="/nft-metadata">NFT Metadata</Link>
        </li>
        <li>
          <Link to="/floor-price">NFT Floor Price</Link>
        </li>
        <li>
          <Link to="/transaction-mined-status">Transaction Mined Status</Link>
        </li>
        <li>
          <Link to="/asset-transfers">Asset Transfers</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
