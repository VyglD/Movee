import {isEscKeyDown, getPreviousArrayIndex, getNextArrayIndex} from "./utils";
import {FOCUS_ELEMENTS, Key} from "./constants";

const CustomClass = {
  POPUP: `popup`,
  POPUP_INFO: `popup__info`,
  DISABLE_SCROLL: `disable-scroll`,
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

const handleEmptyPlaceClickHandler = (evt) => {
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
    popup.removeEventListener(`click`, handleEmptyPlaceClickHandler);

    previousFocusableElement.focus();

    document.removeEventListener(`keydown`, handleEscKeyDown);
    document.removeEventListener(`keydown`, handleFocusElementChange);
  }
};

const openPopup = () => {
  if (popup) {
    // Предотвращает повторное открытие попапа, если он уже открыт
    if (!document.body.dataset.position) {
      const pagePosition = window.scrollY;

      document.body.classList.add(CustomClass.DISABLE_SCROLL);
      document.body.dataset.position = pagePosition;
      document.body.style.top = `${-1 * pagePosition}px`;

      previousFocusableElement = document.activeElement;

      popup.classList.add(`popup--opened`);
      popup.addEventListener(`click`, handleEmptyPlaceClickHandler);

      document.addEventListener(`keydown`, handleEscKeyDown);
      document.addEventListener(`keydown`, handleFocusElementChange);
    }

    focusableElements = Array.from(popup.querySelectorAll(FOCUS_ELEMENTS));

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
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

    const prepareInfoBlock = (newInfoBlock) => {
      const oldInfoBlock = popupContent.querySelector(`.${CustomClass.POPUP_INFO}`);

      newInfoBlock.classList.add(CustomClass.POPUP_INFO);

      if (oldInfoBlock) {
        oldInfoBlock.replaceWith(newInfoBlock);
      } else {
        popupContent.prepend(newInfoBlock);
      }
    };

    const showPopup = (newInfoBlock) => {
      prepareInfoBlock(newInfoBlock);

      newInfoBlock.append(popupCallbackForm);

      openPopup(popup);
    };

    const showPopupWithoutCallbackForm = (newInfoBlock) => {
      prepareInfoBlock(newInfoBlock);

      popupCallbackForm.remove();

      openPopup(popup);
    };

    return {showPopup, showPopupWithoutCallbackForm};
  }

  return () => {};
};

export {
  getPopupChanger,
};
