export type Tile = {
  type: "number" | "voltorb";
  value: number;
  flipped: boolean;
};

export type GameBoard = Tile[][];

export const generateBoard = (): GameBoard => {
  const board: GameBoard = Array(5)
    .fill(null)
    .map(() =>
      Array(5)
        .fill(null)
        .map(() => ({ type: "number", value: 1, flipped: false }))
    );

  let voltorbs = 10;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (Math.random() < 0.2 && voltorbs > 0) {
        board[i][j] = { type: "voltorb", value: 0, flipped: false };
        voltorbs--;
      } else {
        board[i][j].value = Math.ceil(Math.random() * 3);
      }
    }
  }

  return board;
};

export const calculateHints = (board: GameBoard) => {
  const rowHints = board.map((row) => ({
    sum: row.reduce((sum, tile) => sum + tile.value, 0),
    voltorbs: row.filter((tile) => tile.type === "voltorb").length,
  }));

  const columnHints = board[0].map((_, colIndex) => {
    const column = board.map((row) => row[colIndex]);
    return {
      sum: column.reduce((sum, tile) => sum + tile.value, 0),
      voltorbs: column.filter((tile) => tile.type === "voltorb").length,
    };
  });

  return { rowHints, columnHints };
};

export const flipTile = (
  board: GameBoard,
  row: number,
  col: number
): GameBoard => {
  const tile = board[row][col];
  if (tile.flipped) return board;

  tile.flipped = true;

  if (tile.type === "voltorb") {
    alert("Game over!");
  }

  return [...board];
};
