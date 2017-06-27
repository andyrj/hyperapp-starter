import shortid from 'shortid';

export default {
	add: (state, actions) => {
		const newCounter = {
			id: shortid.generate(),
			count: 0
		};
		return {...state,
			counters: state.counters.concat(newCounter)
		};
	},
	remove: (state, actions, {id}) => {
		let index = state.counters.map((c, i) => {
			if (c.id === id) return i;
		})[0];
		return {
			...state,
			counters: [
				...state.counters.slice(0, index),
				...state.counters.slice(index + 1)	
			]
		};
	}
};
