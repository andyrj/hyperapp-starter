import shortid from "shortid";
import { update, $apply, $each, $begin, $set } from 'qim';

export const counters = {
  add: (state, actions) => ({
    counters: state.counters.concat({ id: shortid.generate(), count: 0 })
  }),
  remove: (state, actions, { id }) => ({
    counters: state.counters.filter(c => c.id !== id)
  }),
  increment: (state, actions, { id }) => update(
    ['counters', $each ,counter => counter.id === id, 'count', $apply(count => count + 1)],
    state
  ),
  decrement: (state, actions, { id }) => update(
    ['counters', $each, counter => counter.id === id, 'count', $apply(count => count - 1)], 
    state
  )

};
