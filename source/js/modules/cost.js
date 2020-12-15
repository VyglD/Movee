const init = () => {
  const openCostsButton = document.querySelector(`#open-costs-buttons-js`);
  const costsList = document.querySelector(`.cost__offers-list`);

  if (openCostsButton && costsList) {
    openCostsButton.addEventListener(`click`, () => {
      Array.from(costsList.querySelectorAll(`li`))
        .forEach((node) => {
          node.classList.add(`cost__offer-wrapper--opened`);
        });

      openCostsButton.remove();
    });
  }
};

export {
  init
};
