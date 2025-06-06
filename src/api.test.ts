import { InMemoryTicTacToeApi } from "./api";
import { expect } from 'vitest';

describe("InMemoryTicTacToeApi", () => {
  let api: InMemoryTicTacToeApi;

  beforeEach(() => {
    api = new InMemoryTicTacToeApi();
  });

  describe("newGame", () => {
    it("creates a new game in the correct initial state", async () => {
      const game = await api.createGame();

      expect(game).toBeDefined();
      expect(game.currentPlayer).toBe("X");
      expect(game.endState).toBeUndefined();
      expect(game.board).toEqual([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ]);
    });
  });
});
