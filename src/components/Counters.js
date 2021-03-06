import { h } from "hyperapp";
import Header from "./Header";
import Counter from "./Counter";

const getIncrementer = (actions, id) => event => {
  actions.counters.increment({ id });
};

const getDecrementer = (actions, id) => event => {
  actions.counters.decrement({ id });
};

const getRemover = (actions, id) => event => {
  actions.counters.remove({ id });
};

export default (state, actions) => {
  return (
    <body>
      <div>
        <Header state={state} actions={actions} />
        <button onclick={actions.counters.add}>Add</button>
        {state.counters.map(counter => {
          const id = counter.id;
          const count = counter.count;
          return (
            <Counter
              id={id}
              inc={getIncrementer(actions, id)}
              dec={getDecrementer(actions, id)}
              rem={getRemover(actions, id)}
            >
              {count}
            </Counter>
          );
        })}
      </div>
    </body>
  );
};
