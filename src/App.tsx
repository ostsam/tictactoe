import { useEffect, useMemo, useState } from "react";
import { initGame, move, type Game } from "./logic/logic.ts";

export class ClientSideApi {
  async createGame() {
    const response = await fetch("/api/game", {
      method: "POST",
    });
    const game = await response.json();
    return game;
  }

  async move(id: string, rowIdx: number, colIdx: number) {
    const response = await fetch(`/api/game/${id}/move`, {
      method: "POST",
      body: JSON.stringify({
        rowIdx,
        colIdx,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedGame = await response.json();
    return updatedGame;
  }
}

function App() {
  const api = useMemo(() => new ClientSideApi(), []);
  const [game, setGame] = useState<Game | undefined>(undefined);

  const createNewGame = async () => {
    const game = await api.createGame();
    setGame(game);
  };

  useEffect(() => {
    createNewGame();
  }, []);

  const click = async (rowIdx: number, colIdx: number) => {
    const response = await fetch(`/api/game/${game?.id}/move`, {
      method: "POST",
      body: JSON.stringify({
        rowIdx,
        colIdx,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const updatedGame = await response.json();
    setGame(updatedGame);
  };

  if (!game) {
    return <p>loading...</p>;
  }

  const displayWinner = () => {
    if (game.endState == "X") {
      return "X won!";
    } else if (game.endState == "O") {
      return "O won!";
    } else {
      return "Tie!";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <div className="w-full max-w-sm bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4">
            <h1 className="text-center my-5 text-4xl font-bold text-slate-100 tracking-wide">
              Current Player:
            </h1>
            <div className="mt-2 flex justify-center">
              <span
                className={`inline-block px-4 py-1 rounded-full text-lg font-bold tracking-tight 
                ${
                  game.currentPlayer === "X"
                    ? "bg-red-600 text-red-100"
                    : "bg-blue-600 text-blue-100"
                }`}
              >
                {game.currentPlayer}
              </span>
            </div>
          </div>
          <div className="p-5">
            {game.endState ? (
              <div className="flex flex-col items-center gap-4">
                <div className="text-center text-xl font-medium text-slate-200">
                  {displayWinner()}
                </div>
              </div>
            ) : (
                <div className="grid grid-cols-3 grid-rows-3 gap-2">
                  {game.board.map((row, rowIdx) =>
                    row.map((col, colIdx) => (
                      <button
                        key={`${rowIdx}-${colIdx}`}
                        onClick={() => click(rowIdx, colIdx)}
                        className="aspect-square flex items-center justify-center bg-slate-700 border-2 border-slate-600 rounded-md shadow-inner hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 transition-all"
                      >
                        <span className="text-4xl font-bold text-slate-100 select-none">
                          {col ?? ""}
                        </span>
                      </button>
                    ))
                  )}
                </div>
            )}
            <button
              onClick={() => createNewGame()}
              className="mt-4 w-full px-4 py-2 bg-green-700 text-slate-100 font-medium rounded-md shadow-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              New Game
            </button>
          </div>
      </div>
    </div>
  );
}

export default App;
