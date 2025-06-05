import { drizzle } from "drizzle-orm/postgres-js";
import type { TicTacToeAPI } from "../api";
import {
  type Board,
  type EndState,
  type Player,
  type Game,
  initGame,
  move as makeMove,
} from "../logic/logic";
import { gamesTable } from "./schema.ts";
import { eq } from "drizzle-orm";
const db = drizzle(process.env.DATABASE_URL!);

export class DbTicTacToeApi implements TicTacToeAPI {
  async createGame(): Promise<Game> {
    const game = initGame();
    const values: typeof gamesTable.$inferInsert = game;
    await db.insert(gamesTable).values(values);
    return game;
  }

  async move(id: string, rowIdx: number, colIdx: number): Promise<Game> {
    const game = await this.getGame(id);
    const newMove = await makeMove(game, rowIdx, colIdx);
    const values: typeof gamesTable.$inferInsert = newMove;
    await db.update(gamesTable).set(values).where(eq(gamesTable.id, id));
    return newMove;
  }

  async getGame(id: string): Promise<Game> {
    const games = await db
      .select()
      .from(gamesTable)
      .where(eq(gamesTable.id, id));
    const game = games[0];
    return game as Game;
  }
}
