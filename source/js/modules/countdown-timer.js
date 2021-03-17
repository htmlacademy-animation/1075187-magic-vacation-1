export default class countDownTimer {
  constructor() {
    this.timeId = undefined;
    this.endTime = undefined;
    this.minutesElem = document.querySelector(`.game__counter span:first-child`);
    this.secondsElem = document.querySelector(`.game__counter span:last-child`);
  }

  getRemainingTime(stopTime) {
    return stopTime - new Date().getTime();
  }

  getFormatTime(time) {
    time = Math.floor(time);
    return `${time < 10 ? `0${time}` : time}`;
  }

  setTime() {
    const remainingTime = this.getRemainingTime(this.endTime);

    if (remainingTime >= 1000) {
      this.minutesElem.textContent = this.getFormatTime((remainingTime / (60 * 1000)) % 60);
      this.secondsElem.textContent = this.getFormatTime((remainingTime / 1000) % 60);

      requestAnimationFrame(this.setTime.bind(this));
    }
  }

  startTimer () {
    this.endTime = new Date().getTime() + (5 * 60 * 1000);
    this.timeId = requestAnimationFrame(this.setTime.bind(this));
  }

  stopTimer() {
    cancelAnimationFrame(this.timeId);

    this.minutesElem.textContent = `00`;
    this.secondsElem.textContent = `00`;
  }

};
