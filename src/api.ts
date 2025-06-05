import type { Game } from "./logic/logic";
import { initGame } from "./logic/logic";
import { move as logicMove } from "./logic/logic";

export interface TicTacToeAPI {
  createGame(): Promise<Game>;
  move(id: string, rowIdx: number, colIdx: number): Promise<Game>;
  getGame(id: string): Promise<Game>;
}

export class InMemoryTicTacToeApi implements TicTacToeAPI {
  private games = new Map<string, Game>();

  async createGame(): Promise<Game> {
    const newInstance = initGame();
    this.games.set(newInstance.id, newInstance);
    return newInstance;
  }
  async move(id: string, rowIdx: number, colIdx: number): Promise<Game> {
    const oldGame = await this.getGame(id);
    const newGame = logicMove(oldGame, rowIdx, colIdx);
    this.games.set(newGame.id, newGame);
    return newGame;
  }

  async getGame(id: string): Promise<Game> {
    const game = this.games.get(id);
    if (game === undefined) {
      throw new Error("Invalid game.");
    }
    return game;
  }
}

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
