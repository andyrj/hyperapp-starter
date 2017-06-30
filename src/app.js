import { h, app, Router } from 'hyperapp';

export default (state) => {
  app({
    state,
    view: (state, actions) => {
      return (
        <div><button onclick={actions.increment}>increment</button>{state.count}</div>
      );
    },
    events: {
      // action: console.log
    },
    actions: { 
      increment: (state, actions) => ({
        count: state.count + 1
      })
    }
  });
};
