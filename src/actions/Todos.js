import shortid from 'shortid';

export default {
	add: (state, actions, text) => {
		return {
			todos: state.todos.concat({
				id: shortid.generate(),
				text,
				completed: false
			})
		};
	},
	remove: (state, actions, id) => {
		const index = state.todos.findIndex(t => t.id === id);

		return {
			todos: [
				...state.todos.slice(0, index),
				...state.todos.slice(index + 1)
			]
		};
	},
	filter: (state, actions, filterStr) => {
		return {
			todoFilter: filterStr
		};
	}
};
