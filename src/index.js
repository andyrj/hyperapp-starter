import app from './app';

//TODO: client specific code will go here

// hyperapp doesn't hydrate existing dom so it must be regenerated
// this will cause a flicker when re-rendered client side... meh..
document.body.innerHTML = '';
let state = {
	count: 0
};
app(state);

if (module.hot) {
	module.hot.accept('./app', () => {
		document.body.innerHTML = '';
		app(state);
	});
	module.hot.accept();
}