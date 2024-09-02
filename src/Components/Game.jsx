import React, { useEffect } from 'react';
import './game.css';
import { useState } from 'react';
import head from '../assets/heads.png';
import tails from '../assets/tail.png';

const Game = () => {
  const [result, setResult] = useState(null);
  const HeadOrTail = (choice) => {
    return () => {
      const randomChoice = Math.random() < 0.5 ? 'heads' : 'tail';
      const OutComeChoise =
        choice === randomChoice
          ? `It's ${randomChoice}, so you go First !`
          : `It's ${randomChoice}, so you go Second !`;
      setResult(OutComeChoise);
    };
  };

  useEffect(() => {
    const handleBox = () => {
      return Math.floor(Math.random() * 9) + 1;
    };
    console.log(handleBox());
  },[]);



  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <p>
        Player 1: X <br /> Player 2: O
      </p>
      <div className="choose-coin">
        <p>Let's see who goes first : </p>

        <button
          className="coin"
          onClick={HeadOrTail('head')}
        >
          <img
            src={head}
            alt=""
          />
        </button>
        <button
          className="coin"
          onClick={HeadOrTail('tail')}
        >
          <img
            src={tails}
            alt=""
          />
        </button>
      </div>
      <p>{result}</p>

      <div className="game-boxes-outline">
        <div
          className="game-box"
          id="box1"
        ></div>
        <div
          className="game-box"
          id="box2"
        ></div>
        <div
          className="game-box"
          id="box3"
        ></div>
        <div
          className="game-box"
          id="box4"
        ></div>
        <div
          className="game-box"
          id="box5"
        ></div>
        <div
          className="game-box"
          id="box6"
        ></div>
        <div
          className="game-box"
          id="box7"
        ></div>
        <div
          className="game-box"
          id="box8"
        ></div>
        <div
          className="game-box"
          id="box9"
        ></div>
      </div>
    </div>
  );
};

export default Game;
