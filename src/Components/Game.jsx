import React, { useState, useEffect } from 'react';
import './game.css';
import head from '../assets/heads.png';
import tails from '../assets/tail.png';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(null);
  const [winner, setWinner] = useState(null);
  const [coinFlipResult, setCoinFlipResult] = useState(null);
  const [isCoinFlipped, setIsCoinFlipped] = useState(false);

  const handleMove = (index) => {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = board.slice();
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  // Function to check for a winner
  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]); // Set the winner
        return board[a];
      }
    }

    // Check for a draw
    if (!board.includes(null)) {
      setWinner('Draw');
      return 'Draw';
    }

    return null;
  };

  const computerMove = () => {
    const emptyBoxes = board
      .map((box, index) => (box === null ? index : null))
      .filter((val) => val !== null);
    if (emptyBoxes.length > 0) {
      const randomIndex =
        emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
      const newBoard = board.slice();
      newBoard[randomIndex] = 'O';
      setBoard(newBoard);
      setIsPlayerTurn(true);
    }
  };

  const flipCoin = (choice) => {
    setIsCoinFlipped(true);
    const randomChoice = Math.random() < 0.5 ? 'heads' : 'tails';
    const playerGoesFirst = choice === randomChoice;
    setCoinFlipResult(
      playerGoesFirst
        ? `It's ${randomChoice}, so you go First!`
        : `It's ${randomChoice}, so the computer goes First!`
    );
    setIsPlayerTurn(playerGoesFirst);

    if (!playerGoesFirst) {
      setTimeout(() => {
        computerMove();
      }, 500);
    }
  };

  useEffect(() => {
    const currentWinner = checkWinner(board);
    if (!currentWinner && !isPlayerTurn && isCoinFlipped) {
      setTimeout(computerMove, 500);
    }
  }, [board, isPlayerTurn, isCoinFlipped]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(null);
    setWinner(null);
    setCoinFlipResult(null);
    setIsCoinFlipped(false);
  };

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      {isPlayerTurn === null && !isCoinFlipped && (
        <div className="coin-flip">
          <p>Let's flip a coin to decide who goes first:</p>
          <button className="coin" onClick={() => flipCoin('heads')}>
            <img src={head} alt="heads" />
          </button>
          <button className="coin" onClick={() => flipCoin('tails')}>
            <img src={tails} alt="tails" />
          </button>
        </div>
      )}
      {coinFlipResult && <p>{coinFlipResult}</p>}
      <div className="board">
        {board.map((value, index) => (
          <div key={index} className="box" onClick={() => handleMove(index)}>
            {value}
          </div>
        ))}
      </div>
      {winner && (
        <div className="winner">
          {winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}
        </div>
      )}
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default Game;
