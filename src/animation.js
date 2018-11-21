import { FRAMES_PER_SECOND } from './constants';

export class Animation {
  constructor(fps) {
    this.fps = fps || FRAMES_PER_SECOND;
    this.paused = false;
    this.delay = 1000 / this.fps;
    this.startTime = Date.now();
  }

  start(callback) {
    requestAnimationFrame(() => this.start(callback));

    const now = Date.now();
    const elapsed = now - this.startTime;

    if (!this.paused && elapsed > this.delay) {
      // adjust for specified delay not being a multiple of RAF's interval (16.7ms)
      this.startTime = now - (elapsed % this.delay);

      callback.apply();
    }
  }

  togglePause() {
    this.paused = !this.paused;
  }
}
