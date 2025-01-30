import { useState } from "react";

function Square({ value, onsquaresClick }) {
  // console.log(value);
  return (
    <button className="square" onClick={onsquaresClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xisUsed, setxisUsed] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xisUsed ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquare = squares.slice();
    if (xisUsed) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }
    setSquares(nextSquare);
    setxisUsed(!xisUsed);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="row1 board-row">
        <Square value={squares[0]} onsquaresClick={() => handleClick(0)} />
        <Square value={squares[1]} onsquaresClick={() => handleClick(1)} />
        <Square value={squares[2]} onsquaresClick={() => handleClick(2)} />
      </div>
      <div className="row2 board-row">
        <Square value={squares[3]} onsquaresClick={() => handleClick(3)} />
        <Square value={squares[4]} onsquaresClick={() => handleClick(4)} />
        <Square value={squares[5]} onsquaresClick={() => handleClick(5)} />
      </div>
      <div className="row3 board-row">
        <Square value={squares[6]} onsquaresClick={() => handleClick(6)} />
        <Square value={squares[7]} onsquaresClick={() => handleClick(7)} />
        <Square value={squares[8]} onsquaresClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const winnerPos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winnerPos.length; i++) {
    const [a, b, c] = winnerPos[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
