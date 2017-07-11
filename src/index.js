import app from "./app";

// safely parse json state from SSR
const state = JSON.parse(document.getElementById("state").innerHTML);

let target = document.getElementById('root');
app(state, target);

if (module.hot) {
  module.hot.accept("./app", () => {
    app(window.state, target);
  });
}
