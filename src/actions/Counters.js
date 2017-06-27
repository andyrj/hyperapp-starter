import shortid from 'shortid';

export default {
	add: (state, actions) => {
		const newCounter = {
			id: shortid.generate(),
			count: 0
		};
		return {
			counters: state.counters.concat(newCounter)
		};
	},
	remove: (state, actions, id) => {
		let index = state.counters.findIndex(c => c.id === id);
		console.log(index);
		return {
			counters: [
				...state.counters.slice(0, index),
				...state.counters.slice(index + 1)	
			]
		};
	}
};
