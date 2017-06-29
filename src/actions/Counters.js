import shortid from "shortid";

export default {
  add: (state, actions) => ({
    counters: state.counters.concat({ id: shortid.generate(), count: 0 })
  }),
  remove: (state, actions, { id }) => ({
    counters: state.counters.filter(c => c.id !== id)
  })
};
