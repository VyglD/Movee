import {getPreviousArrayIndex, getNextArrayIndex} from "./utils";

const CustomClass = {
  SLIDE_ACTIVE: `autopark__slide--active`,
  BUTTON_ACTIVE: `autopark__slide-button--active`,
  SWITCH_BUTTON_DISABLED: `autopark__slider-switch-button--disabled`,
};

const DataKey = {
  TYPE: `type`,
  SLIDE: `slide`,
};

const getActiveElement = (elements, className) => {
  return elements.find((element) => element.classList.contains(className));
};

const getElementByDataKey = (elements, dataKey, dataValue) => {
  return elements.find((element) => element.dataset[dataKey] === dataValue);
};

const changeActiveView = (oldView, newView, activeViewClass) => {
  oldView.classList.remove(activeViewClass);
  newView.classList.add(activeViewClass);
};

const changeActiveButton = (oldButton, newButton, activeBtnClass) => {
  oldButton.classList.remove(activeBtnClass);
  oldButton.disabled = false;

  newButton.classList.add(activeBtnClass);
  newButton.disabled = true;
};

const setCustomListeners = (buttons, views, activeBtnClass, activeViewClass, dataKey) => {
  const clickHandler = (evt) => {
    const activeButton = getActiveElement(buttons, activeBtnClass);

    if (evt.target !== activeButton) {
      const activeView = getActiveElement(views, activeViewClass);
      const newView = getElementByDataKey(views, dataKey, evt.target.dataset[dataKey]);

      changeActiveView(activeView, newView, activeViewClass);
      changeActiveButton(activeButton, evt.target, activeBtnClass);
    }
  };

  buttons.forEach((button) => {
    button.addEventListener(`click`, clickHandler);
  });
};

const switchButtonClickHandler = (slides, slideButtons, getNewIndex) => {
  return () => {
    const currentIndex = slides
      .findIndex((node) => node.classList.contains(CustomClass.SLIDE_ACTIVE));

    const newIndex = getNewIndex(currentIndex, slides);

    if (newIndex !== currentIndex) {
      const currentSlide = slides[currentIndex];
      const newSlide = slides[newIndex];

      const activeButton = getActiveElement(slideButtons, CustomClass.BUTTON_ACTIVE);
      const newButton = getElementByDataKey(
          slideButtons,
          DataKey.SLIDE,
          newSlide.dataset[DataKey.SLIDE]
      );

      changeActiveView(currentSlide, newSlide, CustomClass.SLIDE_ACTIVE);
      changeActiveButton(activeButton, newButton, CustomClass.BUTTON_ACTIVE);
    }
  };
};

const init = () => {
  let typeButtons = Array.from(document.querySelectorAll(`.autopark__type-button`));
  let sliders = Array.from(document.querySelectorAll(`.autopark__slider-wrapper`));

  if (typeButtons && sliders) {
    typeButtons = Array.from(typeButtons);
    sliders = Array.from(sliders);

    setCustomListeners(
        typeButtons,
        sliders,
        `autopark__type-button--active`,
        `autopark__slider-wrapper--active`,
        DataKey.TYPE
    );
  }

  let sliderContainers = document.querySelectorAll(`.autopark__slider-wrapper`);

  if (sliderContainers) {
    sliderContainers = Array.from(sliderContainers);

    sliderContainers.forEach((container) => {
      const prevButton = container.querySelector(`.autopark__slider-switch-button--previous`);
      const nextButton = container.querySelector(`.autopark__slider-switch-button--next`);

      let slides = container.querySelectorAll(`.autopark__slide`);
      let slideButtons = container.querySelectorAll(`.autopark__slide-button`);

      if (slides && slideButtons) {
        slides = Array.from(slides);
        slideButtons = Array.from(slideButtons);

        if (slides.length === 1) {
          const btnsContainer = container.querySelector(`.autopark__slider-controls`);
          if (btnsContainer) {
            btnsContainer.classList.add(`autopark__slider-controls--disabled`);
            slideButtons.forEach((btn) => {
              btn.disabled = true;
            });
          }
        } else {
          setCustomListeners(
              slideButtons,
              slides,
              CustomClass.BUTTON_ACTIVE,
              CustomClass.SLIDE_ACTIVE,
              DataKey.SLIDE
          );
        }

        if (prevButton && nextButton) {
          if (slides.length === 1) {
            prevButton.classList.add(CustomClass.SWITCH_BUTTON_DISABLED);
            prevButton.disabled = true;

            nextButton.classList.add(CustomClass.SWITCH_BUTTON_DISABLED);
            nextButton.disabled = true;
          } else {
            const prevButtonClickHandler = switchButtonClickHandler(
                slides,
                slideButtons,
                getPreviousArrayIndex
            );

            const nextButtonClickHandler = switchButtonClickHandler(
                slides,
                slideButtons,
                getNextArrayIndex
            );

            prevButton.addEventListener(`click`, prevButtonClickHandler);
            nextButton.addEventListener(`click`, nextButtonClickHandler);
          }
        }
      }
    });
  }
};

export {
  init,
};
