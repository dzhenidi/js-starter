import { CELL_SIZE, COLORS, STARTING_POSITION, NUM_COLUMNS, NUM_ROWS } from './constants';
import { Snake } from './snake';
import { createEmptyGrid } from './utilities';

export class Board {
  constructor(grid, snake) {
    this.grid = grid || createEmptyGrid(NUM_ROWS, NUM_COLUMNS);
    this.Y = this.grid.length;
    this.X = this.grid[0].length;
    this.snake = snake || new Snake(STARTING_POSITION);

    this.addSnake();
    this.addApple();
  }

  setCell(pos, value) {
    let [column, row] = pos;
    this.grid[row][column] = value;
  }

  getCell(pos) {
    let [column, row] = pos;
    return this.grid[row][column];
  }

  draw() {
    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');

    for (let y = 0; y < this.Y; y++) {
      for (let x = 0; x < this.X; x++) {
        const rect = [x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE];
        // draw cell
        ctx.fillStyle = COLORS[this.grid[y][x]];
        ctx.fillRect(...rect);

        // draw cell border
        ctx.strokeStyle = 'white';
        ctx.strokeRect(...rect);
      }
    }
  }

  addSnake() {
    this.snake.positions.forEach(position => this.setCell(position, 's'));
  }

  // TODO: add apple to a random unoccupied cell
  addApple(pos) {
    // this.setCell(pos, 'a');
  }

  move(direction) {
    // find next head pos
    const nextPosition = this.getNextPosition(direction);
    if (this.isValidMove(nextPosition)) {
      switch (this.getCell(nextPosition)) {
      case 'a': {
        // update the snake
        this.snake.growTo(nextPosition);
        // add the new head
        this.setCell(this.snake.head, 's');
        break;
      }
      case 0: {
        // remove the old tail
        if (this.snake.tail) {
          this.setCell(this.snake.tail, 0);
        } else {
          this.setCell(this.snake.head, 0);
        }
        // update the snake
        this.snake.slitherTo(nextPosition);
        // add the new head
        this.setCell(this.snake.head, 's');
        break;
      }
      }
    }
  }

  getNextPosition(direction) {
    const [x, y] = this.snake.head;

    switch (direction) {
    case 'up': {
      return [
        x,
        y - 1
      ];
    }
    case 'down': {
      return [
        x,
        y + 1
      ];
    }
    case 'left': {
      return [
        x - 1,
        y
      ];
    }
    case 'right': {
      return [
        x + 1,
        y
      ];
    }
    }
  }

  isValidMove(pos) {
    const [x, y] = pos;
    if (x < 0 || x >= this.X || y < 0 || y >= this.Y) {
      return false;
    }
    return true;
  }

  getEmptyCells() {
    let emptyCells = [];
    for (let y = 0; y < this.Y; y++) {
      for (let x = 0; x < this.X; x++) {
        if (this.getCell([x, y]) === 0) {
          emptyCells.push([x, y]);
        }
      }
    }
    return emptyCells;
  }

}

