import { h, app } from "hyperapp";
import { Router } from "./router";
import Home from "./components/Home";
import Counters from "./components/Counters";
import * as actions from "./actions";
import { DEV, SERVER } from "./utils";

const routes = [
  ['/', Home],
  ['/counters', Counters]
];

function hydrate(element) {
  return element
    ? {
        tag: element.tagName.toLowerCase(),
        data: {},
        children: [].map.call(element.childNodes, function(element) {
          return element.nodeType === 3
            ? element.nodeValue
            : hydrate(element);
        })
      }
    : element;
}

export default (state, target) => {
  let mixins = [Router(routes)];
  if (DEV && !SERVER) {
    mixins.push(
      require("hyperapp-webpack-hmr")(),
      require("hyperapp-redux-devtools")()
    );
  }
  app({
    root: target,
    state,
    view: (state, actions) => <div>Error</div>,
    events: {
      load: function (state, actions, root) {
        return hydrate(root);
      }
    },
    actions,
    mixins
  }, target);
};
