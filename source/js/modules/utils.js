import {Key} from "./constants";

const createElement = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;

  return wrapper.firstElementChild;
};

const createOrderButton = (customClass = ``) => {
  const orderButtonTemplate = (`
    <button class="${customClass} order-button" type="button">Заказать</button>
  `);

  return createElement(orderButtonTemplate);
};

const getNextArrayIndex = (currentIndex, arr) => {
  return (currentIndex + 1) % arr.length;
};

const getPreviousArrayIndex = (currentIndex, arr) => {
  return (currentIndex + (arr.length - 1)) % arr.length;
};

const isEscKeyDown = (evt) => {
  return evt.key === Key.ESC;
};

const removeClassesWithModificator = (nodes, modificator) => {
  if (!nodes.length) {
    nodes = [nodes];
  }

  nodes.forEach((node) => {
    if (
      node.className &&
      node.className.includes &&
      node.className.includes(modificator)
    ) {
      node.classList.forEach((nodeClass) => {
        if (nodeClass.includes(modificator)) {
          node.classList.remove(nodeClass);
        }
      });
    }
  });
};

export {
  createElement,
  createOrderButton,
  getNextArrayIndex,
  getPreviousArrayIndex,
  isEscKeyDown,
  removeClassesWithModificator,
};
