CREATE TABLE "tictactoe-games" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"currentPlayer" varchar(255) NOT NULL,
	"board" jsonb NOT NULL,
	"endState" varchar(255)
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;