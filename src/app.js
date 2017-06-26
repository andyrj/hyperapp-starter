import { h, app, Router } from 'hyperapp';
import hmr from 'hyperapp-webpack-hmr';
import { DEV } from './utils';

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
		mixins: [hmr()]
	});
};
