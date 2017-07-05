import { randomString } from "../utils";

export const todos = {
  changeInput: (state, actions, { e }) => ({}),
  changeFilter: (state, actions, { e }) => ({}),
  add: (state, actions, { text }) => ({
    todos: state.todos.concat({
      id: randomString(8),
      text,
      completed: false
    })
  }),
  remove: (state, actions, { id }) => ({
    todos: state.todos.filter(t => t.id !== id)
  }),
  filter: (state, actions, { filterStr }) => ({
    todoFilter: filterStr
  }),
  changeTodo: (state, actions, { id, text }) => ({
    todos: state.todos.map((t, id) => (t.id === id ? { ...t, text } : t))
  }),
  toggle: (state, actions, { id }) => ({
    todos: state.todos.map(
      (t, id) => (t.id === id ? { ...t, completed: !t.completed } : t)
    )
  })
};
