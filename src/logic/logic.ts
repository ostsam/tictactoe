  export type Cell = Player | null
  export type Board = Cell[][]
  export type Player = "X" | "O"

  export type Game = {
    board: Board,
    currentPlayer: Player
  }

  export const initBoard = (): Game => {
    return {
        board:[
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ],
    currentPlayer: "Red"
    }
  }