export default {
	changeTodo: (state, actions, {id, text}) => ({
		todos: state.todos.map((t, id) => t.id === id ? {...t, text} : t)
	}),
	toggle: (state, actions, {id}) => ({
		todos: state.todos.map((t, id) => t.id === id ? {...t, completed: !t.completed} : t)
	})
};
