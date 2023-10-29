import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
    const [block, setBlock] = useState();
    const [blockNumber, setBlockNumber] = useState();
    const [blockWithTransactions, setBlockWithTransactions] = useState();
    
    useEffect(() => {
      async function getBlockNumber() {
        setBlockNumber(await alchemy.core.getBlockNumber());
      }
      async function getBlock() {
        const a = await alchemy.core.getBlock(blockNumber);
        console.log(a);
        setBlock(JSON.stringify(a));
      }
      async function getBlockWithTransactions() {
        const a = await alchemy.core.getBlockWithTransactions(blockNumber);
        console.log(a);
        setBlockWithTransactions(JSON.stringify(a));

      }
      getBlockWithTransactions();
      getBlock();
      getBlockNumber();
    });
    
  
    return (<div>
                <div className="App"> Block Number: {blockNumber}</div>
                <div className="App"> Block: {block}</div>
                <div className="App"> Block Transaction: {blockWithTransactions}</div>
    
            </div>);
  }

export default App;
