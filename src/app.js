import { h, app, Router } from 'hyperapp';
import Home from './components/Home';
import Test from './components/Test';

export default () => {
	app({
		state: 'Hello World!123',
		view: [
			['/', state => <Home />],
			['/test', state => <Test />]
		],
		mixins: [Router]
	});
};
