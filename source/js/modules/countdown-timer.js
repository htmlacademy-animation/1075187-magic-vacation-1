export default class countDownTimer {
  constructor() {
    this.timeId = undefined;
    this.endTime = undefined;
    this.startTime = undefined;
    this.minutesElem = document.querySelector(`.game__counter span:first-child`);
    this.secondsElem = document.querySelector(`.game__counter span:last-child`);
  }

  getRemainingTime(stopTime) {
    return stopTime - Date.now();
  }

  getFormatTime(time) {
    time = Math.floor(time);
    return `${time < 10 ? `0${time}` : time}`;
  }

  setTime() {
    const remainingTime = this.getRemainingTime(this.endTime);
    const interval = this.getRemainingTime(this.startTime);

    if (remainingTime > 0) {
      if (Math.abs(interval) >= 1000) {
        this.startTime = Date.now();
        this.minutesElem.textContent = this.getFormatTime((remainingTime / (60 * 1000)) % 60);
        this.secondsElem.textContent = this.getFormatTime((remainingTime / 1000) % 60);
      }

      requestAnimationFrame(this.setTime.bind(this));
    }
  }

  startTimer () {
    this.startTime = Date.now();
    this.endTime = this.startTime + (5 * 60 * 1000);
    this.timeId = requestAnimationFrame(this.setTime.bind(this));
  }

  stopTimer() {
    cancelAnimationFrame(this.timeId);

    this.minutesElem.textContent = `00`;
    this.secondsElem.textContent = `00`;
  }

};
