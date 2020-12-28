import {getOffers} from "./modules/backend";
import {getPopupChanger} from "./modules/popup";
import {init as initMenu} from "./modules/menu";
import {init as initCost} from "./modules/cost";
import {init as initAutopark} from "./modules/autopark";
import {init as initReviews} from "./modules/reviews";
import {init as initCallback} from "./modules/callback";
import {init as initMap} from "./modules/map";

const NO_JS_MODIFICATOR = `--no-js`;

Array.from(document.querySelectorAll(`*`))
  .forEach((node) => {
    if (
      node.className &&
      node.className.includes &&
      node.className.includes(NO_JS_MODIFICATOR)
    ) {
      node.classList.forEach((nodeClass) => {
        if (nodeClass.includes(NO_JS_MODIFICATOR)) {
          node.classList.remove(nodeClass);
        }
      });
    }
  });

Promise.resolve(
    getOffers()
)
  .then(({autopark, places}) => {
    const {showPopup, showPopupWithoutCallbackForm} = getPopupChanger();

    initMenu();
    initCost(places, showPopup);
    initAutopark(autopark, showPopup);
    initReviews();
    initCallback(showPopupWithoutCallbackForm);
    initMap();
  });
