import { useState } from "react";

function Square({ data, onSquareClick }) {
  return (
    <button
      className="border bg-red-400 h-18 w-18 text-3xl pl-2 pr-2 text-white"
      onClick={onSquareClick}
    >
      {data}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({ squares, xIsNext, onPlay }) {
  function handelClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="m-2 p-3 border-3 border-white h-75 w-62 flex flex-col items-center bg-gray-500">
      <div className="bg-red-500 border-2 text-white h-14 w-54 text-2xl flex items-center justify-center ">
        {status}
      </div>
      <div className="flex">
        <Square data={squares[0]} onSquareClick={() => handelClick(0)} />
        <Square data={squares[1]} onSquareClick={() => handelClick(1)} />
        <Square data={squares[2]} onSquareClick={() => handelClick(2)} />
      </div>
      <div className="flex">
        <Square data={squares[3]} onSquareClick={() => handelClick(3)} />
        <Square data={squares[4]} onSquareClick={() => handelClick(4)} />
        <Square data={squares[5]} onSquareClick={() => handelClick(5)} />
      </div>
      <div className="flex">
        <Square data={squares[6]} onSquareClick={() => handelClick(6)} />
        <Square data={squares[7]} onSquareClick={() => handelClick(7)} />
        <Square data={squares[8]} onSquareClick={() => handelClick(8)} />
      </div>
    </div>
  );
}

export default function game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquears = history[currentMove];

  function handelPlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go To Move #" + move;
    } else {
      description = "Go to game Start";
    }
    return (
      <li key={move} className="border-2 p-2 rounded-xl bg-red-900 text-white">
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="flex border-4 border-gray-50 w-120 h-135 justify-between pr-3 m-3 bg-amber-800">
      <Board squares={currentSquears} xIsNext={xIsNext} onPlay={handelPlay} />
      <div>
        <ul className="flex flex-col gap-2 pt-2">{moves}</ul>
      </div>
    </div>
  );
}
