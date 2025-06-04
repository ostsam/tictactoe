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
