import { h, app, Router } from 'hyperapp';
import { DEV } from './utils';

export default (state) => {
	app({
		state,
		view: (state, actions) => {
			return (
				<div>
					<p>Hot module reload! no refresh required!</p>
					<button onclick={actions.increment}>Click</button>
					<span>{state.count}</span>
				</div>
			);
		},
		actions: {
			increment: (state) => Object.assign({}, state, { count: state.count + 1 } )
		},
		events: {
			render: (data) => {
				window.state = Object.assign({}, window.state, data)
			}
		}
	});

	return appInst;
};
