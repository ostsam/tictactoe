import { useState } from "react";
import "./App.css";
import "./logic/logic.ts";
import { initGame, move } from "./logic/logic.ts";

function App() {
  const [game, setGame] = useState(initGame());

  const click = (rowIdx: number, colIdx: number) => {
    setGame(move(game, rowIdx, colIdx));
  };

  ///let newBoard = initGame();
  const boardHtml = (
    <div className="board">
      {game.board.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="flex">
            {row.map((col, colIdx) => {
              return (
                <div
                  key={colIdx}
                  className="col"
                  onClick={() => click(rowIdx, colIdx)}
                >
                  {JSON.stringify(col)}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );

  const displayWinner = () => {
    if (game.endState == "X") {
      return "X won!";
    } else if (game.endState == "O") {
      return "O won!";
    } else return "Tie";
  };

  return (
    <>
      <div className="h1">Current Player: {game.currentPlayer}</div>
      {game.endState ? <div>{displayWinner()}</div> : boardHtml}
      <button
        onClick={() => {
          setGame(initGame());
        }}
      >
        New Game
      </button>
    </>
  );
}

export default App;
