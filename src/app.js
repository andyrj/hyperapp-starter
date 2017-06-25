import { h, app, Router } from 'hyperapp';

export default (state) => {
	app({
		state: state,
		view: (state, actions) => {
			return (
				<div>
					<p>Hot reloaded!</p>
					<button onclick={actions.increment}>Click</button>
					<span>{state.count}</span>
				</div>
			);
		},
		actions: {
			increment: (state) => Object.assign({}, state, { count: state.count + 1 } )
		}
	});
};
