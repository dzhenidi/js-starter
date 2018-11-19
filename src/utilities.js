export function createEmptyGrid(rows, columns) {
  let grid = [];
  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    for (let x = 0; x < columns; x++) {
      grid[y][x] = 0;
    }
  }
  return grid;
}
