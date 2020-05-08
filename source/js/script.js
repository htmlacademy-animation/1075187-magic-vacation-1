// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import TextAnimation from "./modules/text-animation";

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();


const $rulesBtn = document.querySelector(`.rules__link`);
const $rulesLastItem = document.querySelector(`.screen--rules .rules__item:last-child p`);
const animationTopTitle = new TextAnimation(`#top .intro__title`, 500, `active-text`, `transform`);
const animationTopDate = new TextAnimation(`#top .intro__date`, 500, `active-text`, `transform`);

window.onload = () => {
  document.body.classList.add(`loaded`);

  $rulesLastItem.addEventListener(`transitionend`, setClassOnTransitionEnd);

  setTimeout(() => {
    animationTopTitle.startAnimation();
    animationTopDate.startAnimation();
  }, 300);

};

document.body.addEventListener(`screenChanged`, (event) => {
  if (!event.detail) {
    return;
  }

  switch (event.detail.screenName) {
    case `top`:
      animationTopTitle.startAnimation();
      animationTopDate.startAnimation();
      break;
    case `rules`:
      $rulesLastItem.addEventListener(`transitionend`, setClassOnTransitionEnd);
      break;
    default:
      animationTopTitle.stopAnimation();
      animationTopDate.stopAnimation();
      // prevent second change on elements state restore when screen was hidden
      $rulesLastItem.removeEventListener(`transitionend`, setClassOnTransitionEnd);
      $rulesBtn.classList.remove(`animated`);
  }
});

function setClassOnTransitionEnd(event) {
  if (event.propertyName === `opacity`) {
    $rulesBtn.classList.add(`animated`);
  }
}
