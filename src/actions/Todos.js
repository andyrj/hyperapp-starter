import { shortid } from 'shortid';

export default {
	add: (state, actions, {text}) => {
		state.todoInput = '';
		state.todos = state.todos.concat({
			id: shortid.generate(),
			text,
			completed: false
		});
	},
	remove: (state, actions, {id}) => {
		const index = state.todos.map((t, id) => {
			if (t.id === id) return id;
		})[0];
		state.todos = [
			...state.todos.splice(0, index),
			...state.todos.splice(index + 1)
		];
	},
	filter: (state, actions, {filterStr}) => {
		state.todoFilter = filterStr;
	}
};
