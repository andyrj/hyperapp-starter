export default {
	toggle: (state, actions, id) => ({
		todos: state.todos.map((t, id) =>t.id === id ? {...t, completed: !t.completed} : t)
	})
};
