import React, { useState } from 'react';
import './App.css';
import { Container} from 'react-bootstrap';
import "./components/board.css"


function App() {

  const [board, setBoard] = useState(Array.from({length: 9}, () => ""))
  const [turn, setTurn] = useState(false)
  const [winner, setWinner] = useState(""||"X"||"O");
  const [colored, setColored] = useState(Array.from({length: 3}, () => 10));

  const reset = () => {
    setTurn(false);
    setWinner("");
    setBoard(Array.from({length: 9}, () => ""));
    setColored(Array.from({length: 3}, () => 10))
  }

  const clickHandler = (index: number) => {
    if(!winner){ 
      if(board[index] === ""){
        board[index] = turn === false ? "X" : "O";
        setTurn(!turn);
      }
      checkWin();
    }
  }

  const checkWin = () => {
    for(let item of winMoves) {
      let w = turn === false? "X" : "O";
      if(board[item[0]] === w && board[item[1]] === w && board[item[2]] === w){
        setWinner(w);
        setColored(item);
      }
    }
  }

  const winMoves = [
    // righe
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // colonne
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonali
    [0, 4, 8],
    [2, 4, 6],
  ];

  return (
    <>
      <Container>
          <p style={{fontSize: 40}}>Tic Tac Toe</p>
          
          <div className='winner'>
            {winner && <><p> Game Over!</p> <p>Winner: {winner} </p></> || <p>Turn: {turn === false ? "X" : "O"}</p>} 
          </div>
          
          
      </Container>
      
      <Container>
        { board.map((item, index) => {
            return(        
              <div className="box" 
                onClick={() => clickHandler(index)} key={index} 
                style={{background: colored.some(w => w === index) ? "#A020F0" : ""}}
              >
                {item === "" ? "" : item} 
              </div>
            )
          })
        }
      </Container>

      <button className="btn btn-rounded" onClick={reset}>Play Again</button>
    </>
  );
}

export default App;
