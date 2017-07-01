import { h, app } from "hyperapp";
import { Router } from '@hyperapp/router';
import Home from "./components/Home";
import Counters from "./components/Counters";
import Todos from "./components/Todos";
import actions from "./actions";
import { DEV, SERVER } from "./utils";

let mixins = [Router];
if (DEV && !SERVER) {
  mixins.push(
    require("hyperapp-webpack-hmr")(),
    require("hyperapp-redux-devtools")()
  );
}

export default state => {
  app({
    state,
    view: [["/", Home], ["/counters", Counters], ["/todos", Todos]],
    events: {
      // action: console.log
    },
    actions,
    mixins
  });
};
