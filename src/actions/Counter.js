export default {
	increment: (state, actions, {id}) => {
		return {
			...state,
			counters: state.counters.map(counter => {
				counter.id === id ? {...counter, count: counter.count + 1} : counter;
			})
		};
	},
	decrement: (state, actions, {id}) => {
		return {
			...state,
			counters: state.counters.map(counter => {
				counter.id === id ? {...counter, count: counter.count - 1} : counter;
			})
		};
	}
};
