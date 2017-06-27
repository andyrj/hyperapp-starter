import { shortid } from 'shortid';

export default {
	add: (state, actions) => {
		return {
			counters: state.counters.concat({
				id: shortid.generate(),
				count: 0
			})
		};
	},
	remove: (state, actions, {id}) => {
		let index = state.counters.map((c, i) => {
			if (c.id === id) return i;
		})[0];
		state.counters = [
			...state.counters.slice(0, index),
			...state.counters.slice(index + 1)	
		];
	}
};
