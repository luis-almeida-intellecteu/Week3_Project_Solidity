
import './App.css';
import {alchemy} from './Settings';
import {useCollapse} from 'react-collapsed';

function Collapsible(props) {
    const { getCollapseProps, getToggleProps } = useCollapse();
    return (
        <div className="collapsible">
            <div className="balance" {...getToggleProps()}>
                {props.title}
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    {props.content}
                </div>
            </div>
          </div>
        );
}

function Block({ latestBlock, setLatestBlock, block, setBlock, blockNumber, setBlockNumber, blockWithTransactions, setBlockWithTransactions}) {
    async function onChange(evt) {
      const number = evt.target.value;

      setBlockNumber(number);

      var parsedNumber = parseInt(number);
      var fullBlock = "";
      var blockOfTransactions = "";

      if (!isNaN(parsedNumber)) 
      {
        fullBlock = await alchemy.core.getBlock(latestBlock);
        blockOfTransactions = await alchemy.core.getBlockWithTransactions(latestBlock);
      }

      console.log("////////////////");
      console.log("ParsedNumber: " + parsedNumber + " , " + typeof(parsedNumber));
      console.log("Number: " + number + " , " + typeof(number));
      console.log("Latest: " + latestBlock + " , " + typeof(latestBlock));

      const listItems = blockOfTransactions.transactions.map(
        transaction => <li><Collapsible content={JSON.stringify(transaction)} title={"HASH: " + JSON.stringify(transaction.hash)}></Collapsible></li>);

      console.log(listItems);
    

      setBlock(JSON.stringify(fullBlock));
      setBlockWithTransactions(listItems);
      //setBlockWithTransactions(JSON.stringify(blockOfTransactions.transactions));
    }
   
    return (
        <div className="container wallet">
          <h1>Block Explorer</h1>

          <div className="balance"> Latest Block: {latestBlock}</div>
    
          <label>
            Block
            <input placeholder="Type your Block Number..." value={blockNumber} onChange={onChange}></input>
          </label>

          <Collapsible content={block} title={"Full Block"}></Collapsible>
          <Collapsible content={blockWithTransactions} title={"Transactions"}></Collapsible>



        </div>

        
      );


}




export default Block;
