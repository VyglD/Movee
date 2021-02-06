const animate = ({timing, draw, duration}) => {

  let start = performance.now();

  const animateFraction = (time) => {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) {
      timeFraction = 1;
    }

    let progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animateFraction);
    }
  };

  requestAnimationFrame(animateFraction);
};

const init = () => {
  const navLinks = document.querySelectorAll(`.header__nav-link, .footer__link--nav`);

  navLinks.forEach((link) => {
    link.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const currentYOffset = window.pageYOffset;
      const scrollOffset = document.querySelector(evt.target.getAttribute(`href`)).getBoundingClientRect().y;

      animate({
        duration: 300,
        timing(timeFraction) {
          return timeFraction;
        },
        draw(progress) {
          scrollTo(0, currentYOffset + scrollOffset * progress);
        }
      });
    });
  });
};

export {
  init,
};
