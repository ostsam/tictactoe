import {
  initGame,
  move as logicMove,
  type EndState,
  type Game,
} from "./logic/logic";

export interface TicTacToeAPI {
  createGame(): Promise<Game>;
  move(id: string, rowIdx: number, colIdx: number): Promise<Game>;
  getGame(id: string): Promise<Game>;
  gameLibrary(): Promise<Game[]>;
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

  async gameLibrary(): Promise<Game[]> {
    return Array.from(this.games.values());
  }
}

export class ClientSideApi {
  async createGame(): Promise<Game> {
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

  async getGame(id: string): Promise<Game> {
    const response = await fetch(`/api/game/${id}`);
    const game = await response.json();
    return game;
  }

  async gameLibrary(): Promise<Game[]> {
    const response = await fetch("/api/lobby");
    const games = await response.json();
    return games;
  }
}
