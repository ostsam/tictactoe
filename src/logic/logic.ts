export type Cell = Player | null;
export type Board = [
  [Cell, Cell, Cell],
  [Cell, Cell, Cell],
  [Cell, Cell, Cell]
];
export type Player = "X" | "O";

export type EndState = "X" | "O" | "tie" | undefined | null;

export type Game = {
  id: string;
  board: Board;
  currentPlayer: Player;
  endState?: EndState;
};

export const initGame = (): Game => {
  return {
    id: crypto.randomUUID(),
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    currentPlayer: "X",
  };
};

const winStates = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];

const getWinner = (game: Game, player: Player) => {
  return winStates.some((winState) => {
    return winState.every((rowIndexPair) => {
      return game.board[rowIndexPair[0]][rowIndexPair[1]] == player;
    });
  });
};

const xWins = (game: Game) => getWinner(game, "X");
const oWins = (game: Game) => getWinner(game, "O");

function calculateEndState(game: Game): EndState {
  if (
    game.board.every((row) => {
      return row.every((cell) => cell !== null);
    })
  )
    return "tie";
  if (xWins(game)) return "X";
  if (oWins(game)) return "O";

  return undefined;
}

export function move(game: Game, rowIdx: number, colIdx: number): Game {
  const newGame = structuredClone(game);
  if (newGame.board[rowIdx][colIdx] != null) {
    console.log("Occupied square"); ///Error message in UI later
    return newGame;
  }
  if (newGame.currentPlayer == "X") {
    newGame.currentPlayer = "O";
  } else {
    newGame.currentPlayer = "X";
  }
  newGame.board[rowIdx][colIdx] = game.currentPlayer;
  newGame.endState = calculateEndState(newGame);
  console.log(newGame.endState);
  return newGame;
}
