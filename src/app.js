import { h, app } from "hyperapp";
import { Router } from "@hyperapp/router";
import Home from "./components/Home";
import Counters from "./components/Counters";
import * as actions from "./actions";
import { DEV, SERVER } from "./utils";

export default (state, target) => {
  let mixins = [];//[Router]; // for some reason Router mixin fails in SSR @ 0.10.0 but worked in 0.9.3
  if (DEV && !SERVER) {
    mixins.push(
      require("hyperapp-webpack-hmr")(),
      require("hyperapp-redux-devtools")()
    );
  }
  app({
    state,
    view: (state, actions) => <div>SSR'd static view works...  but router mixin fails server side</div>,//[["/", Home], ["/counters", Counters]],
    events: {
      action: console.log
    },
    actions,
    mixins
  }, target);
};
