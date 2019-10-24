import React,{useState}from 'react';
import './index.css';



function  Square(props) {
  
    return (
      <button className="square" onClick={() => props.onClick()}>
        {props.value} 
      </button>
    );
  
}

function Board (props) {
   
  const renderSquare = (i) => {
    return (<Square value={props.squares[i]}
             onClick={() => props.onClick(i)}
             />
      );
  }
    
    return (
      <div>
        
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
  
}

function Game ()  {
  const [history,setHistory] = useState({item:[{squares:Array(9).fill(null)}],})
  const [isNext,setNext]= useState(true);
  const [stepNumber,setStep]= useState(history.item.length);
  const current = history.item[stepNumber-1]
  
  const handleClick = (i)=> {
    const historytmp= history.item.slice(0,stepNumber+1);
    const currenttmp=history.item[history.item.length-1];
    const  squarestmp = currenttmp.squares.slice();
    console.log(stepNumber)
    console.log(historytmp)

    squarestmp[i]=isNext?'X':'O';
    setHistory({item: historytmp.concat([{squares:squarestmp}])})
    setNext(!isNext);
    setStep(stepNumber+1)
  }

  const calculateWinner = (squares)=>{
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
    
    for (let i =0;i< lines.length;i++){
      const [a,b,c]= lines[i];
      
      if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
        return squares[a];
      }

    }
    return null;


  }

  const winner = calculateWinner(current.squares);

  const moves = history.item.map((step,move)=>{
     const desc = move ? "Go to move #"+ move : "Go to game start";  
     return(<li key={move}>
       <button onClick={()=> jumpTo(move)}>{desc}</button>
     </li>);
  });

 const jumpTo=(move)=>{
  setStep(move);
  setNext((stepNumber%2)===0)


 }

  let status ;
  if (winner){
      status= "Winner is "+ winner;
  }
  else{
    status = 'Next player: '+ (isNext?'X':'O');
  }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
          onClick={(i) => handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status }</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  
}



/////////

function App() {
  return (
    <Game/>
  );
}

export default App;
