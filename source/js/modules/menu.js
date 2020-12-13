const CustomClass = {
  OPENED: `header__nav--opened`,
  CLOSED: `header__nav--closed`,
};

const init = () => {
  const toggleButton = document.querySelector(`#nav-toggle-js`);
  const nav = document.querySelector(`#nav-js`);

  if (toggleButton && nav) {
    toggleButton.addEventListener(`click`, () => {
      if (nav.classList.contains(CustomClass.OPENED)) {
        nav.classList.remove(CustomClass.OPENED);
        nav.classList.add(CustomClass.CLOSED);
      } else {
        nav.classList.remove(CustomClass.CLOSED);
        nav.classList.add(CustomClass.OPENED);
      }
    });
  }
};

export {
  init,
};
