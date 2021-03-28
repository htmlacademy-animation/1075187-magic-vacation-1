import CountNumbers from './count-numbers';

export default () => {
  const prizeScreen = document.querySelector(`.screen--prizes`);
  const prizeJourneys = prizeScreen.querySelector(`.prizes__item--journeys img`);
  const prizeCases = prizeScreen.querySelector(`.prizes__item--cases img`);
  const prizeCodes = prizeScreen.querySelector(`.prizes__item--codes img`);

  const prizesDesc = [...prizeScreen.querySelectorAll(`.prizes__desc`)];

  const images = [
    {
      path: `img/primary.svg`,
      timeDelay: 500,
      target: prizeJourneys
    },
    {
      path: `img/secondary.svg`,
      timeDelay: 4500,
      target: prizeCases,
      startNumber: 1,
      maxNumber: 7,
    },
    {
      path: `img/additional-award.svg`,
      timeDelay: 8000,
      target: prizeCodes,
      startNumber: 11,
      maxNumber: 900,
    },
  ];

  function setImagesSvg() {
    if (!prizeJourneys.hasAttribute(`src`)) {
      images.forEach(({path, timeDelay, target, startNumber, maxNumber}, i) => {
        setTimeout(() => {
          target.setAttribute(`src`, `${path}?time=${Date.now()}`);

          prizesDesc[i].classList.add(`active`);
          prizesDesc[i].addEventListener(`animationstart`, () => {
            if (maxNumber) {
              const countNumbers = new CountNumbers(prizesDesc[i].querySelector(`b`), startNumber, maxNumber);
              countNumbers.startCounter();
            }
          });

          if (target === prizeJourneys) {
            prizeScreen.querySelector(`.prizes__item--journeys`).classList.add(`active`);
          }
        }, timeDelay);
      });
    }
  }

  if (prizeScreen.classList.contains(`active`)) {
    setImagesSvg();
  }
}
