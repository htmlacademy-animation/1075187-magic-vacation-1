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
const $rulesLastItem = document.querySelector(`.screen--rules.active .rules__item:last-child p`);

window.onload = () => {
  document.body.classList.add(`loaded`);
};

document.body.addEventListener(`screenChanged`, (event) => {
  if (!event.detail) {
    return;
  }

  if (event.detail.screenName === `rules`) {
    $rulesLastItem.addEventListener(`transitionend`, setClassOnTransitionEnd);
  } else {
    $rulesLastItem.removeEventListener(`transitionend`, setClassOnTransitionEnd);
    $rulesBtn.classList.remove(`animated`);
  }
});

function setClassOnTransitionEnd(event) {
  if (event.propertyName === `opacity`) {
    $rulesBtn.classList.add(`animated`);
  }
}
