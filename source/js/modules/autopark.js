import {
  getNextArrayIndex,
  getPreviousArrayIndex,
  createOrderButton,
  createElement
} from "./utils";

const createInfoBlock = (offer) => {
  const template = `
    <div class="info-block">
      <p class="info-block__title">
        Вы выбрали услугу «Переезд
        <span class="info-block__title-highlight">${offer.info}</span>»
      </p>
      <p class="info-block__form-title">
        Для подтвеждения заявки оставьте свои данные
         и мы свяжемся с вами в ближайшее время
      </p>
    </div>
  `;

  return createElement(template);
};

const CustomClass = {
  ORDER_BUTTON: `autopark__offer-order-button`,
  SLIDER_ORDER_BUTTON: `autopark__slider-order-button`,
};

const ActiveClass = {
  TYPE_BUTTON: `autopark__type-button--active`,
  SLIDER: `autopark__slider-wrapper--active`,
  SLIDE: `autopark__slide--active`,
  SLIDE_BUTTON: `autopark__slide-button--active`,
};

const DataKey = {
  TYPE: `type`,
  SLIDE: `slide`,
};

const PackKey = {
  TYPE_BUTTON: `TYPE_BUTTON`,
  SLIDER: `SLIDER`,
  SLIDE: `SLIDE`,
  SLIDE_BUTTON: `SLIDE_BUTTON`,
};

const ActivePack = {
  [PackKey.TYPE_BUTTON]: null,
  [PackKey.SLIDER]: null,
  [PackKey.SLIDE]: null,
  [PackKey.SLIDE_BUTTON]: null,
};

const isActivePackExist = () => {
  return ActivePack[PackKey.TYPE_BUTTON] &&
    ActivePack[PackKey.SLIDER] &&
    ActivePack[PackKey.SLIDE] &&
    ActivePack[PackKey.SLIDE_BUTTON];
};

const getElementByDataKey = (elements, dataKey, dataValue) => {
  return elements.find((element) => element.dataset[dataKey] === dataValue);
};

const setActiveElement = (element, activeElementClass, packKey) => {
  element.classList.add(activeElementClass);

  ActivePack[packKey] = element;
};

const canselActiveElement = (element, activeElementClass) => {
  if (element.classList.contains(activeElementClass)) {
    element.classList.remove(activeElementClass);
  }
};

const canselActiveButton = (button, activeButtonClass) => {
  canselActiveElement(button, activeButtonClass);

  button.disabled = false;
};

const setActiveButton = (button, activeButtonClass, packKey) => {
  setActiveElement(button, activeButtonClass, packKey);

  button.disabled = true;
};

const setActiveSlide = (slide, slideButton) => {
  setActiveElement(slide, ActiveClass.SLIDE, PackKey.SLIDE);
  setActiveButton(slideButton, ActiveClass.SLIDE_BUTTON, PackKey.SLIDE_BUTTON);
};

const canselActiveSlide = () => {
  canselActiveElement(ActivePack[PackKey.SLIDE], ActiveClass.SLIDE);
  canselActiveButton(ActivePack[PackKey.SLIDE_BUTTON], ActiveClass.SLIDE_BUTTON);
};

const setActiveType = (typeButton, slider, slide, slideButton) => {
  setActiveButton(typeButton, ActiveClass.TYPE_BUTTON, PackKey.TYPE_BUTTON);
  setActiveElement(slider, ActiveClass.SLIDER, PackKey.SLIDER);
  setActiveSlide(slide, slideButton);
};

const canselActiveType = () => {
  if (isActivePackExist()) {
    canselActiveButton(ActivePack[PackKey.TYPE_BUTTON], ActiveClass.TYPE_BUTTON);
    canselActiveElement(ActivePack[PackKey.SLIDER], ActiveClass.SLIDER);
    canselActiveSlide();
  }
};

const getSwitchBtnClickHandler = (slides, slideButtons, getNewIndex) => {
  return () => {
    const activeSlideIndex = slides.findIndex((node) => node === ActivePack[PackKey.SLIDE]);
    const newSlideIndex = getNewIndex(activeSlideIndex, slides);

    if (newSlideIndex !== activeSlideIndex) {
      const newSlide = slides[newSlideIndex];
      const newSlideButton = getElementByDataKey(
          slideButtons,
          DataKey.SLIDE,
          newSlide.dataset[DataKey.SLIDE]
      );

      canselActiveSlide();
      setActiveSlide(newSlide, newSlideButton);
    }
  };
};

const setSwitchBtnClickHandler = (slides, slideBts, getNewIndex, switchBtn) => {
  switchBtn.addEventListener(
      `click`,
      getSwitchBtnClickHandler(slides, slideBts, getNewIndex)
  );
};

const init = (serverOffers, showPopup) => {
  const autopark = document.querySelector(`.autopark`);
  if (autopark) {
    const orderButtons = autopark.querySelectorAll(`.${CustomClass.ORDER_BUTTON}`);
    const sliderOrderButton = autopark.querySelector(`.${CustomClass.SLIDER_ORDER_BUTTON}`);
    let typeButtons = autopark.querySelectorAll(`.autopark__type-button`);
    let sliders = autopark.querySelectorAll(`.autopark__slider-wrapper`);

    const offers = new Map(
        Object.entries(serverOffers).map(([_type, {offers: tempOffers}]) => {
          return tempOffers.map((offer) => [offer.id, offer]);
        }).reduce((result, element) => {
          result.push(...element);
          return result;
        }, [])
    );

    if (orderButtons && sliderOrderButton) {
      const newSliderOrderButton = createOrderButton(CustomClass.SLIDER_ORDER_BUTTON);

      newSliderOrderButton.addEventListener(`click`, () => {
        const activeSlider = autopark.querySelector(
            `.${ActiveClass.SLIDER} .${ActiveClass.SLIDE}`
        );

        if (activeSlider) {
          showPopup(createInfoBlock(offers.get(activeSlider.dataset[DataKey.SLIDE])));
        }
      });

      sliderOrderButton.replaceWith(newSliderOrderButton);

      orderButtons.forEach((button) => {
        const newButton = createOrderButton(CustomClass.ORDER_BUTTON);

        newButton.addEventListener(`click`, () => {
          showPopup(createInfoBlock(offers.get(button.dataset[`offerId`])));
        });

        button.replaceWith(newButton);
      });
    }

    if (typeButtons && sliders) {
      typeButtons = Array.from(typeButtons);
      sliders = Array.from(sliders);

      sliders.forEach((slider, index) => {
        const typeButton = getElementByDataKey(typeButtons, DataKey.TYPE, slider.dataset[DataKey.TYPE]);
        const prevButton = slider.querySelector(`.autopark__slider-switch-button--previous`);
        const nextButton = slider.querySelector(`.autopark__slider-switch-button--next`);

        let slides = slider.querySelectorAll(`.autopark__slide`);
        let slideButtons = slider.querySelectorAll(`.autopark__slide-button`);

        if (typeButton && prevButton && nextButton && slides && slideButtons) {
          slides = Array.from(slides);
          slideButtons = Array.from(slideButtons);

          typeButton.addEventListener(`click`, () => {
            canselActiveType();
            setActiveType(typeButton, slider, slides[0], slideButtons[0]);
          });

          slideButtons.forEach((btn) => {
            btn.addEventListener(`click`, (evt) => {
              if (evt.target !== ActivePack[PackKey.SLIDE_BUTTON]) {
                const newSlideButton = evt.target;
                const newSlide = getElementByDataKey(
                    slides,
                    DataKey.SLIDE,
                    newSlideButton.dataset[DataKey.SLIDE]
                );

                canselActiveSlide();
                setActiveSlide(newSlide, newSlideButton);
              }
            });
          });

          if (slides.length === 1) {
            prevButton.remove();
            nextButton.remove();
          } else {
            setSwitchBtnClickHandler(slides, slideButtons, getPreviousArrayIndex, prevButton);
            setSwitchBtnClickHandler(slides, slideButtons, getNextArrayIndex, nextButton);
          }

          if (index === 0) {
            setActiveType(typeButton, slider, slides[0], slideButtons[0]);
          }
        }
      });
    }
  }
};

export {
  init,
};
