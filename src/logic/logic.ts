export type Cell = Player | null;
export type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
export type Player = "X" | "O";

export type Game = {
  board: Board;
  currentPlayer: Player;
};

export const initBoard = (): Game => {
  return {
    board: [null, null, null, null, "X", null, null, null, null],
    currentPlayer: "X",
  };
};

export default function move(game: Game, cellIdx: number): Game {
  const newGame = structuredClone(game);
  if (newGame.board[cellIdx] != null) {
    console.log("Occupied square"); ///Error message in UI later
    return newGame;
  }
  if (newGame.currentPlayer == "X") {
    newGame.currentPlayer = "O";
  } else {
    newGame.currentPlayer = "X";
  }
  newGame.board[cellIdx] = game.currentPlayer;

  return newGame;

  // 1. Pick a cell
  //arg within function
  // 2. Occupying a cell
  // 3. Is the cell occupied? y/n
  // 4. If not occupied, then fill it
  // 5. Else error
  // 4. Switch player
  // 5. Determine winner/tie
}
