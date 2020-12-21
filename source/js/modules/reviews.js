import Typograf from "typograf";

const MAX_NUMBER_REVIEWS = 3;
const MAX_TEXT_LENGTH = 256;

const CustomClass = {
  HIDDEN: `reviews__item--hidden`,
  VISIBLE: `reviews__item--visible`
};

const init = () => {
  const typograf = new Typograf({locale: [`ru`, `en-US`]});

  let reviews = document.querySelectorAll(`.reviews__item`);
  const showButtom = document.querySelector(`.reviews__show-button`);

  if (reviews && showButtom) {
    reviews = Array.from(reviews);

    Array.from(reviews)
      .slice(MAX_NUMBER_REVIEWS)
      .forEach((review) => {
        review.classList.add(CustomClass.HIDDEN);
      });

    showButtom.addEventListener(`click`, () => {
      reviews.forEach((review) => {
        if (review.classList.contains(CustomClass.HIDDEN)) {
          review.classList.remove(CustomClass.HIDDEN);
        }

        review.classList.add(CustomClass.VISIBLE);

        showButtom.remove();
      });
    });

    reviews.forEach((review) => {
      const textContainer = review.querySelector(`.reviews__review-text`);
      const openButton = review.querySelector(`.reviews__item-open-button`);

      if (textContainer && openButton) {
        const allText = textContainer.innerText;

        if (allText.length > MAX_TEXT_LENGTH) {
          let nextSpace = Array.from(allText.slice(MAX_TEXT_LENGTH))
          .findIndex((char) => char === ` `);
          nextSpace = nextSpace === -1 ? 0 : nextSpace;

          textContainer.innerText = typograf.execute(
              `${allText.slice(0, (MAX_TEXT_LENGTH + nextSpace))}...`
          );

          openButton.addEventListener(`click`, () => {
            textContainer.innerText = typograf.execute(allText);

            openButton.remove();
          });
        } else {
          openButton.remove();
        }
      }
    });
  }
};

export {
  init,
};
