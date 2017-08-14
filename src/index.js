import app from './app';

// safely parse json state from SSR
const state = JSON.parse(document.getElementById('state').innerHTML);

const target = document.body;
app(state, target);

/* used for webpack hmr...
if (module.hot) {
  module.hot.accept('./app', () => {
    app(window.state, target);
  });
}
*/
