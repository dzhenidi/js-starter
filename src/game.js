import { Board } from './board';
import { Animation } from './animation';

export class Game {
  constructor() {
    this.board = new Board();
    this.animation = new Animation();
  }

  init() {
    this.bindKeyHandlers();
    this.animation.start(this.animate.bind(this));
  }

  animate() {
    this.board.step();
    this.board.draw();
  }

  togglePause() {
    this.animation.togglePause();
    // TODO: pause should also disable the navigation key handlers
  }

  bindKeyHandlers() {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
      case 'ArrowUp': {
        this.board.move('up');
        break;
      }
      case 'ArrowDown': {
        this.board.move('down');
        break;
      }
      case 'ArrowLeft': {
        this.board.move('left');
        break;
      }
      case 'ArrowRight': {
        this.board.move('right');
        break;
      }
      case 'Space': {
        this.togglePause();
        break;
      }
      }
    });
  }
}
