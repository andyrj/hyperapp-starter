import { h, app, Router } from 'hyperapp';

export default (state) => {
	const appInst = app({
		state,
		view: (state, actions) => {
			return (
				<div>
					<p>Hot reloaded! state saved... kind of hackish</p>
					<button onclick={actions.increment}>Click</button>
					<span>{state.count}</span>
				</div>
			);
		},
		actions: {
			increment: (state) => Object.assign({}, state, { count: state.count + 1 } )
		}
	});

	return appInst;
};
