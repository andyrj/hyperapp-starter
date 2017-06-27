export default {
	toggle: (state, actions, {id}) => {
		state.todos = state.todos.map((t, id) => {
			t.id === id ? Object.assign({}, t, {completed: !t.completed}) : t
		});
	}
};
