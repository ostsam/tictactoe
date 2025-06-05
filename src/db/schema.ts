import { jsonb, pgTable, varchar } from "drizzle-orm/pg-core";
import type { Board } from "../logic/logic.ts";

export const gamesTable = pgTable("tictactoe", {
  id: varchar({ length: 255 }).primaryKey(),
  currentPlayer: varchar({ length: 255 }).notNull(),
  board: jsonb().$type<Board>().notNull(),
  endState: varchar({ length: 255 }),
});
