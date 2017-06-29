export default {
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
