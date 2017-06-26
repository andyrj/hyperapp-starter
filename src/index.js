import app from './app';

// hyperapp doesn't hydrate existing dom so it must be regenerated
// this will cause a flicker when re-rendered client side... meh..
document.body.innerHTML = '';
app({
	count: 0
});

if (module.hot) {
	module.hot.accept('./app', () => {
		document.body.innerHTML = '';
		app(window.state);
	});
}
