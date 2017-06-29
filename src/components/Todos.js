import { h } from "hyperapp";
import Header from "./Header";

export default (state, actions) => {
  return (
    <div>
      <Header state={state} actions={actions} />
      <div>
        <label htmlFor="todo">
          {"Todo: "}
        </label>
        <input id="todo" type="text" value={state.todoInput} />
      </div>
      <div>
        <label htmlFor="filter">
          {"Filter: "}
        </label>
        <input id="filter" type="test" value={state.todoFilter} />
      </div>
      <ul>
        {state.todos.map(todo => {
          return (
            <li>
              {todo.completed
                ? <s>{todo.text}</s>
                : todo.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
