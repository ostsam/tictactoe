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
import { eq, isNull } from "drizzle-orm";
import postgres from "postgres";
import { config } from "dotenv";
config({ path: ".env", override: true });

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

export class DbTicTacToeApi implements TicTacToeAPI {
  async createGame(): Promise<Game> {
    const game = initGame();
    const values: typeof gamesTable.$inferInsert = game;
    await db.insert(gamesTable).values(values);
    return game;
  }

  async move(id: string, rowIdx: number, colIdx: number): Promise<Game> {
    const game = await this.getGame(id);
    const newMove = makeMove(game, rowIdx, colIdx);
    const values: typeof gamesTable.$inferInsert = newMove;
    await db.update(gamesTable).set(values).where(eq(gamesTable.id, id));
    return newMove;
  }

  async getGame(id: string): Promise<Game> {
    // require: game id (id). it's a string.
    // to do: look into our games table
    // SELECT * FROM gamesTable WHERE id = ${id}
    //  - use SQL to filter to the one we need
    const selectResults = await db
      .select()
      .from(gamesTable)
      .where(eq(gamesTable.id, id));

    if (selectResults.length == 0) {
      throw new Error("no game found with this id!");
    }

    //  - feed the results of the SQL query into this function.
    //  - convert the SQL result into the Game type.
    // return: the entire game that has that ID.
    const game = selectResults[0];
    return {
      id: game.id,
      currentPlayer: game.currentPlayer as Player,
      board: game.board as Board,
      endState: game.endState as EndState,
    };
  }

  async gameLibrary(): Promise<Game[]> {
    const games = await db
      .select()
      .from(gamesTable)
      .where(isNull(gamesTable.endState))
      .limit(10);

    return games.map((game) => ({
      id: game.id,
      currentPlayer: game.currentPlayer as Player,
      board: game.board as Board,
      endState: game.endState as EndState,
    }));
  }
}
