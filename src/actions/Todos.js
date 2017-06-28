import shortid from 'shortid';

export default {
	add: (state, actions, text) => ({
		todos: state.todos.concat({
			id: shortid.generate(),
			text,
			completed: false
		})
	}),
	remove: (state, actions, id) => ({
		todos: state.todos.filter(t => t.id !== id)
	}),
	filter: (state, actions, filterStr) => ({
		todoFilter: filterStr
	})
};
