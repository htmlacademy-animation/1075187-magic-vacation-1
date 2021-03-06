export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);
  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        targetEl[0].classList.add(`screen--show`);
        targetEl[0].classList.remove(`screen--hidden`);

        const animateTitle = `${target}Title`;
        setTitleAnimation(animateTitle);

      });
    }

    let playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }


  function setTitleAnimation(elemId) {
    const elem = document.getElementById(elemId);
    const pathList = [...elem.querySelectorAll(`path`)];

    pathList.forEach((path, index) => {
      const pathLength = path.getTotalLength() / 2;
      const pathAnimate = path.querySelector(`animate`);

      path.setAttribute(`stroke-dasharray`, `0 ${pathLength}`);
      pathAnimate.setAttribute(`to`, `${pathLength} 0`);

      if (elemId === 'result3Title') {
        setBounceAnimation(path, index);

        const delay = pathAnimate.getAttribute('dur');
        pathAnimate.setAttribute(`begin`, `${delay + (0.2 * index)}`);
      }

      pathAnimate.beginElement();
    });
  }

  function setBounceAnimation(path, index) {
    const pathAnimateTransform = path.querySelector(`animateTransform`);
    const bounceSpeed = 1.3;

    pathAnimateTransform.setAttribute(`keyTimes`, `0; ${0.05 + (0.05 * index)}; ${0.68 + (0.01 * index)}; ${0.85 + (0.01 * index)}; 1`);
    pathAnimateTransform.setAttribute(`dur`, `${bounceSpeed - (0.1 * index)}s`);
  }
};