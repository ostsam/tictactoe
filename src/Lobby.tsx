import { Link, useLoaderData } from "react-router";
import type { Game } from "./logic/logic";
import { useState } from "react";

export default function Lobby() {
  const { games: initialGames } = useLoaderData<{ games: Game[] }>();

  console.log(initialGames);
  const [games, setGames] = useState<Game[]>(initialGames);

  return (
    <div>
      <h1>Let's all go to the lobby and get ourselves a game</h1>
      {games.map((game) => (
        <div key={game.id}>
          {" "}
          <Link to={`/game/${game.id}`}>{game.id}</Link>
        </div>
      ))}
    </div>
  );
}
