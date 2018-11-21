import { CELL_SIZE, COLORS, STARTING_POSITION, NUM_COLUMNS, NUM_ROWS, STARTING_DIRECTION, BOARD_WIDTH, BOARD_HEIGHT } from './constants';
import { Snake } from './snake';
import { createEmptyGrid, getRandomInt } from './utilities';

export class Board {
  constructor(grid, snake) {
    this.grid = grid || createEmptyGrid(NUM_ROWS, NUM_COLUMNS);
    this.NUM_ROWS = this.grid.length;
    this.NUM_COLS = this.grid[0].length;
    this.snake = snake || new Snake(STARTING_POSITION);
    this.snakeDirection = STARTING_DIRECTION;
    this.hasApple = false;

    this.addSnake();
  }

  setCell(pos, value) {
    let [row, column] = pos;
    this.grid[row][column] = value;
  }

  getCell(pos) {
    let [row, column] = pos;
    return this.grid[row][column];
  }

  step() {
    this.move(this.snakeDirection);
    if (!this.hasApple) {
      this.addApple();
    }
  }

  draw() {
    const canvas = global.document.getElementById('snake-canvas');
    canvas.width = BOARD_WIDTH;
    canvas.height = BOARD_HEIGHT;
    const ctx = canvas.getContext('2d');
    for (let y = 0; y < this.NUM_ROWS; y++) {
      for (let x = 0; x < this.NUM_COLS; x++) {
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

  addApple() {
    const availablePositions = this.getEmptyCells();
    const randomPosition = availablePositions[getRandomInt(availablePositions.length + 1)];
    this.setCell(randomPosition, 'a');
    this.hasApple = true;
  }

  move(direction) {
    this.snakeDirection = direction;
    // find next head pos
    const nextPosition = this.getNextPosition(direction);
    if (this.isValidMove(nextPosition)) {
      switch (this.getCell(nextPosition)) {
      case 'a': {
        // update the snake
        this.snake.growTo(nextPosition);
        // update the board
        this.setCell(this.snake.head, 's');
        this.hasApple = false;
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
        this.snake.moveTo(nextPosition);
        // update the board
        this.setCell(this.snake.head, 's');
        break;
      }
      }
    }
  }

  getNextPosition(direction) {
    const [row, col] = this.snake.head;

    switch (direction) {
    case 'up': {
      return [
        row - 1,
        col
      ];
    }
    case 'down': {
      return [
        row + 1,
        col
      ];
    }
    case 'left': {
      return [
        row,
        col - 1
      ];
    }
    case 'right': {
      return [
        row,
        col + 1
      ];
    }
    }
  }

  isValidMove(pos) {
    let [row, col] = pos;
    if (col < 0 || col >= this.NUM_COLS || row < 0 || row >= this.NUM_ROWS) {
      return false;
    }
    return true;
  }

  getEmptyCells() {
    let emptyCells = [];
    for (let row = 0; row < this.NUM_ROWS; row++) {
      for (let col = 0; col < this.NUM_COLS; col++) {
        if (this.getCell([row, col]) === 0) {
          emptyCells.push([row, col]);
        }
      }
    }
    return emptyCells;
  }

}

