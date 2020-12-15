import {init as initMenu} from "./modules/menu";
import {init as initCost} from "./modules/cost";

const NO_JS_MODIFICATOR = `--no-js`;

const nodes = Array.from(document.querySelectorAll(`*`));

nodes
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

initMenu();
initCost();
