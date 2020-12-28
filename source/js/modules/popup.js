import {isEscKeyDown, getPreviousArrayIndex, getNextArrayIndex} from "./utils";
import {FOCUS_ELEMENTS, Key} from "./constants";

const CustomClass = {
  POPUP: `popup`,
  POPUP_INFO: `popup__info`,
  DISABLE_SCROLL: `disable-scroll`,
  HIDDEN_FORM: `callback-form--hidden`,
};

let popup = null;
let previousFocusableElement = document.body;
let focusableElements = [];

const handleEscKeyDown = (evt) => {
  if (isEscKeyDown(evt)) {
    closePopup(evt);
  }
};

const handleFocusElementChange = (evt) => {
  if (evt.key === Key.TAB) {
    let indexElement = 0;
    focusableElements = Array.from(popup.querySelectorAll(FOCUS_ELEMENTS));

    evt.preventDefault();

    if (evt.shiftKey) {
      indexElement = getPreviousArrayIndex(
          focusableElements.indexOf(document.activeElement),
          focusableElements
      );
    } else {
      indexElement = getNextArrayIndex(
          focusableElements.indexOf(document.activeElement),
          focusableElements
      );
    }

    focusableElements[indexElement].focus();
  }
};

const handleEmpyPlaceClickHandler = (evt) => {
  if (evt.target.classList.contains(CustomClass.POPUP)) {
    closePopup();
  }
};

const closePopup = () => {
  if (popup) {
    const pagePosition = parseInt(document.body.dataset.position, 10);

    document.body.style.top = `auto`;
    document.body.removeAttribute(`data-position`);
    document.body.classList.remove(CustomClass.DISABLE_SCROLL);
    window.scroll({top: pagePosition, left: 0});

    popup.classList.remove(`popup--opened`);
    popup.removeEventListener(`click`, handleEmpyPlaceClickHandler);

    previousFocusableElement.focus();

    document.removeEventListener(`keydown`, handleEscKeyDown);
    document.removeEventListener(`keydown`, handleFocusElementChange);
  }
};

const openPopup = () => {
  if (popup) {
    const pagePosition = window.scrollY;

    document.body.classList.add(CustomClass.DISABLE_SCROLL);
    document.body.dataset.position = pagePosition;
    document.body.style.top = `${-1 * pagePosition}px`;

    previousFocusableElement = document.activeElement;
    focusableElements = Array.from(popup.querySelectorAll(FOCUS_ELEMENTS));

    popup.classList.add(`popup--opened`);
    popup.addEventListener(`click`, handleEmpyPlaceClickHandler);

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    document.addEventListener(`keydown`, handleEscKeyDown);
    document.addEventListener(`keydown`, handleFocusElementChange);
  }
};

const getPopupChanger = () => {
  popup = document.querySelector(`.${CustomClass.POPUP}`);

  if (popup) {
    const closeButton = popup.querySelector(`.popup__close-button`);
    const popupContent = popup.querySelector(`.popup__content`);
    const popupCallbackForm = popup.querySelector(`.callback-form`);

    if (closeButton) {
      closeButton.addEventListener(`click`, closePopup);
    }

    const showPopup = (newInfoBlock) => {
      const oldInfoBlock = popupContent.querySelector(`.${CustomClass.POPUP_INFO}`);

      newInfoBlock.classList.add(CustomClass.POPUP_INFO);
      popupCallbackForm.classList.remove(CustomClass.HIDDEN_FORM);

      if (oldInfoBlock) {
        oldInfoBlock.replaceWith(newInfoBlock);
      } else {
        popupContent.prepend(newInfoBlock);
      }

      openPopup(popup);
    };

    const showPopupWithoutCallbackForm = (newInfoBlock) => {
      showPopup(newInfoBlock);

      popupCallbackForm.classList.add(CustomClass.HIDDEN_FORM);
    };

    return {showPopup, showPopupWithoutCallbackForm};
  }

  return () => {};
};

export {
  getPopupChanger,
};
