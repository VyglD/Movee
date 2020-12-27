import Inputmask from "inputmask";

const VISIBLE_CLASS = `callback__form-field--visible`;
const URL = `https://echo.htmlacademy.ru/`;
const PHONE_REGEX = /^((8|([\+]?7))([\-]| )?)?([\(]?[0-9]{3}[\)]?([\-]| )?)([0-9]|[\-]| ){7,10}$/u;

const phoneMask = new Inputmask({mask: `+7 (999) 999-99-99`, placeholder: `X`});

const isValidField = (trueCondition, field) => {
  let isValid = true;
  let errorMessage = ``;

  if (field.value.length === 0) {
    isValid = false;
    errorMessage = `Заполните поле`;
  } else if (!trueCondition) {
    isValid = false;
    errorMessage = `Поле заполнено неправильно`;
  }

  field.setCustomValidity(errorMessage);

  return isValid;
};

const fieldInputHadler = (evt) => {
  evt.target.setCustomValidity(``);
};


const fieldBlurHandler = (evt) => {
  if (evt.target.value.length > 0) {
    evt.target.parentElement.classList.add(VISIBLE_CLASS);
  } else {
    if (evt.target.parentElement.classList.contains(VISIBLE_CLASS)) {
      evt.target.parentElement.classList.remove(VISIBLE_CLASS);
    }
  }
};

const setEventListeners = (input) => {
  input.required = false;

  input.addEventListener(`input`, fieldInputHadler);
  input.addEventListener(`blur`, fieldBlurHandler);
};

const init = () => {
  const forms = document.querySelectorAll(`.callback-form`);

  if (forms) {
    forms.forEach((form) => {
      const phoneInput = form.querySelector(`input[name="phone"]`);
      const nameInput = form.querySelector(`input[name="name"]`);
      const submitButton = form.querySelector(`.callback-form__submit`);
      const agrementButton = form.querySelector(`.callback-form__agrement input`);

      if (phoneInput && nameInput && submitButton) {
        phoneMask.mask(phoneInput);
        setEventListeners(nameInput);
        setEventListeners(phoneInput);

        submitButton.addEventListener(`click`, (evt) => {
          if (
            isValidField(nameInput.value.length > 0, nameInput) &&
            isValidField(PHONE_REGEX.test(phoneInput.value), phoneInput)
          ) {
            evt.preventDefault();

            fetch(URL, {
              method: `POST`,
              headers: {
                'Content-Type': `application/json;charset=utf-8`
              },
              body: {
                name: nameInput.value,
                phone: phoneInput.value,
              }
            })
              .then((response) => {
                // показа попапа
                window.console.log(response);
              })
              .catch((err) => {
                window.console.error(err);
              });
          }
        });
      }

      form.addEventListener(`submit`, (evt) => {
        evt.preventDefault();
      });

      agrementButton.addEventListener(`click`, () => {
        submitButton.disabled = !agrementButton.checked;
      });
    });
  }
};

export {
  init,
};
