import app from './app';

// safely parse json state from SSR
const state = JSON.parse(document.getElementById('state').innerHTML);

// hyperapp doesn't hydrate existing dom so it must be regenerated
// this will cause a flicker when re-rendered client side... meh..
document.body.innerHTML = '';
app(state);

if (module.hot) {
  module.hot.accept('./app', () => {
    document.body.innerHTML = '';
    app(window.state);
  });
}
