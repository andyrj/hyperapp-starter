export default {
	increment: (state, actions, {id}) => {
		state.counter = state.counter.map(counter => {
			counter.id === id ? Object.assign({}, counter, { count: counter.count + 1 }) : counter;
		});
	},
	decrement: (state, actions, {id}) => {
		state.counter = state.counter.map(counter => {
			counter.id === id ? Object.assign({}, counter, { count: counter.count - 1 }) : counter;
		});
	}
};
