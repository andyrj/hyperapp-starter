import app from './app';

//TODO: client specific code will go here

// hyperapp doesn't hydrate existing dom so it must be regenerated
// this will cause a flicker when re-rendered client side... meh..
document.body.innerHTML = '';
let instance = app({
	count: 0
});
let savedState = instance.getState();

if (module.hot) {
	setInterval(() => {
		savedState = instance.getState();
		console.log(savedState);
	}, 1000);
	module.hot.accept('./app', () => {
		document.body.innerHTML = '';
		
		app(savedState);
	});
	module.hot.accept();
}