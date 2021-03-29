export default class CountNumbers {
  constructor(container, startNumber, maxNumber) {
    this.fps = 12;
    this.container = container;
    const multiplier = maxNumber <= this.fps ? 1 : Math.round(maxNumber / this.fps);

    this.numbers = new Array(maxNumber > this.fps ? this.fps : maxNumber)
                            .fill(startNumber)
                            .map((item, index) => {
                              return index > 0 ? (index * multiplier) + multiplier : item
                            });

    this.then = Date.now();
    this.fpsInterval = 1000 / this.fps;
    this.startCounter = this.startCounter.bind(this);
  }

  setCounter() {
    this.container.textContent = this.numbers.shift();
  }

  startCounter() {
    let now = Date.now();
    let elapsed = now - this.then;

    if (elapsed > this.fpsInterval && this.numbers.length > 0) {
      this.then = now - (elapsed % this.fpsInterval);
      this.setCounter();
    }

    requestAnimationFrame(this.startCounter);
  }
}
