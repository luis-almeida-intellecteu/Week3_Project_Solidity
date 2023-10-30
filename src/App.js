import { useEffect, useState } from 'react';
import Block from "./Block";
import {alchemy} from './Settings'

import './App.css';



function App() {
    const [latestBlock, setLatestBlock] = useState();
    const [block, setBlock] = useState("");
    const [blockNumber, setBlockNumber] = useState("");
    const [blockWithTransactions, setBlockWithTransactions] = useState("");

    useEffect(() => {

      async function getLatestBlock() {
        setLatestBlock(await alchemy.core.getBlockNumber());
        }
      getLatestBlock();
    });

    
    
  
    return (<div>
                <Block
                    latestBlock={latestBlock}
                    setLatestBlock={setLatestBlock}
                    block={block}
                    setBlock={setBlock}
                    blockNumber={blockNumber}
                    setBlockNumber={setBlockNumber}
                    blockWithTransactions={blockWithTransactions}
                    setBlockWithTransactions={setBlockWithTransactions}
                />
    
            </div>);
  }

export default App;
