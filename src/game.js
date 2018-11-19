import { Board } from './board';

export class Game {
  constructor() {
    this.board = new Board();
  }

  init() {
    this.bindKeyHandlers();
    this.animate();
  }

  animate() {
    this.board.draw();

    requestAnimationFrame(this.animate.bind(this));
  }

  togglePause() {
    // toggle a paused/active property based on which board updates are disabled
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
