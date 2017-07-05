import { randomString } from "../utils";

export const counters = {
  add: (state, actions) => ({
    counters: state.counters.concat({ id: randomString(8), count: 0 })
  }),
  remove: (state, actions, { id }) => ({
    counters: state.counters.filter(c => c.id !== id)
  }),
  increment: (state, actions, { id }) => ({
    counters: state.counters.map(
      counter =>
        counter.id === id ? { ...counter, count: counter.count + 1 } : counter
    )
  }),
  decrement: (state, actions, { id }) => ({
    counters: state.counters.map(
      counter =>
        counter.id === id ? { ...counter, count: counter.count - 1 } : counter
    )
  })
};
