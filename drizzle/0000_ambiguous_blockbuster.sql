CREATE TABLE "tictactoe" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"currentPlayer" varchar(255) NOT NULL,
	"board" jsonb NOT NULL,
	"endState" varchar(255)
);
