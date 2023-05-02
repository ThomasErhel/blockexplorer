import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import BlockList from "./components/BlockList";
import BlockDetails from "./components/BlockDetails";
import TransactionDetails from "./components/TransactionDetails";
import AccountLookup from "./components/AccountLookup";
import NftMetadata from "./components/NftMetadata";
import FloorPrice from "./components/FloorPrice";
import TransactionMinedStatus from "./components/TransactionMinedStatus";
import AssetTransfers from "./components/AssetTransfers";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={BlockList} />
        <Route path="/block/:blockNumber" component={BlockDetails} />
        <Route path="/transaction/:hash" component={TransactionDetails} />
        <Route path="/account-lookup" component={AccountLookup} />
        <Route path="/nft-metadata" component={NftMetadata} />
        <Route path="/floor-price" component={FloorPrice} />
        <Route
          path="/transaction-mined-status"
          component={TransactionMinedStatus}
        />
        <Route path="/asset-transfers" component={AssetTransfers} />
      </Switch>
    </Router>
  );
}

export default App;
