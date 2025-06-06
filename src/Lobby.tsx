import { Link, useLoaderData } from "react-router";
import type { Game } from "./logic/logic";
import { useState } from "react";

export default function Lobby() {
  const { games: initialGames } = useLoaderData<{ games: Game[] }>();

  const [games, _] = useState<Game[]>(initialGames);

  return (
    <div>
      <div className="max-w min-h-screen flex flex-col items-center bg-slate-900 p-6">
        <div className="max-w-md bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4">
            <h1 className="text-center my-10 text-4xl font-bold text-slate-100 tracking-wide">
              It's Lobbyin' Time:
            </h1>
            {games.map((game) => (
              <div
                key={game.id}
                className="flex flex-row justify-center mt-4 w-full px-4 py-2 bg-green-700 text-slate-100 font-medium rounded-md shadow-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                {" "}
                <Link to={`/game/${game.id}`}>{game.id}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
