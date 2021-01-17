import {getOffers} from "./modules/backend";
import {getPopupChanger} from "./modules/popup";
import {init as initMenu} from "./modules/menu";
import {init as initCost} from "./modules/cost";
import {init as initAutopark} from "./modules/autopark";
import {init as initReviews} from "./modules/reviews";
import {init as initCallback} from "./modules/callback";
import {init as initMap} from "./modules/map";
import {removeClassesWithModificator} from "./modules/utils";

const NO_JS_MODIFICATOR = `--no-js`;

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
  })
  .then(() => {
    removeClassesWithModificator(
        Array.from(document.querySelectorAll(`[class*="${NO_JS_MODIFICATOR}"]`)),
        NO_JS_MODIFICATOR
    );
  });
