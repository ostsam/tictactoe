import { useMemo, useState, useEffect } from "react";
import { ClientSideApi } from "./api";
import type { Game } from "./logic/logic";
import { useLoaderData, useNavigate } from "react-router";
import { io } from "socket.io-client";

export default function GameInstance() {
  const api = useMemo(() => new ClientSideApi(), []);
  const { loadedGame } = useLoaderData();
  const [game, setGame] = useState<Game | undefined>(loadedGame);
  const navigate = useNavigate();

  const click = async (rowIdx: number, colIdx: number) => {
    const newMove = await api.move(game!.id, rowIdx, colIdx);
    setGame(newMove);
  };

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      console.log("connected to socket");
      socket.emit("join-game", game?.id);
    });
    socket.on("game-updated", (updatedGameState: Game) => {
      setGame(updatedGameState);
    });
  });

  const createNewGame = async () => {
    const gamePromise: Promise<Game> = api.createGame();
    const game = await gamePromise;
    const gameId = game.id;
    navigate(`/game/${gameId}`);
    setGame(game);
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
