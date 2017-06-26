import { h, app, Router } from 'hyperapp';
import { DEV } from './utils';

let mixins = [];
if (DEV) {
	mixins.push(require('hyperapp-webpack-hmr')(), require('hyperapp-redux-devtools')());
}

export default (state) => {
	app({
		state,
		view: (state, actions) => {
			return (
				<div>
					<p>Hot module reload! no refresh required! woot!</p>
					<button onclick={actions.increment}>Click</button>
					<span>{state.count}</span>
				</div>
			);
		},
		actions: {
			increment: (state) => Object.assign({}, state, { count: state.count + 1 } )
		},
		mixins
	});
};
