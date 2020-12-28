import {createElement, createOrderButton} from "./utils";

const ORDER_BUTTON_CLASS = `cost__offer-order-button`;

const createInfoBlock = (offer) => {
  const template = `
    <div class="info-block">
      <p class="info-block__title">
        Вы выбрали услугу «Переезд
        <span class="info-block__title-highlight">${offer.title}</span>»
      </p>
      <ul class="info-block__features-list list-reset">
        <li class="info-block__feature">${offer.vehicles}</li>
        <li class="info-block__feature">${offer.humans}</li>
        <li class="info-block__feature">${offer.time}</li>
      </ul>
      <p class="info-block__cost">Стоимость услуги
        <span class="info-block__title-highlight info-block__title-highlight--cost">
          ${offer.cost}
        </span>
      </p>
      <p class="info-block__form-title">
        Для подтвеждения заявки оставьте свои данные
        и мы свяжемся с вами в ближайшее время
      </p>
    </div>
  `;

  return createElement(template);
};

const init = (serverOffers, showPopup) => {
  const openCostsButton = document.querySelector(`#open-costs-buttons-js`);
  const costsList = document.querySelector(`.cost__offers-list`);
  const orderButtons = document.querySelectorAll(`.${ORDER_BUTTON_CLASS}`);

  const offers = new Map(serverOffers.map((offer) => [offer.id, offer]));

  if (openCostsButton && costsList && orderButtons) {
    openCostsButton.addEventListener(`click`, () => {
      Array.from(costsList.querySelectorAll(`li`))
        .forEach((node) => {
          node.classList.add(`cost__offer-wrapper--visible`);
        });

      openCostsButton.remove();
    });

    Array.from(orderButtons)
      .forEach((button) => {
        const newButton = createOrderButton(ORDER_BUTTON_CLASS);

        newButton.addEventListener(`click`, () => {
          showPopup(createInfoBlock(offers.get(button.dataset[`offerId`])));
        });

        button.replaceWith(newButton);
      });
  }
};

export {
  init
};
