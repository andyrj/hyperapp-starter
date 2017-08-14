import { h, app, Router } from 'hyperapp';

function hydrate(element) {
  return element
    ? {
        tag: element.tagName.toLowerCase(),
        data: {},
        children: [].map.call(element.childNodes, function(element) {
          return element.nodeType === 3 ? element.nodeValue : hydrate(element);
        })
      }
    : element;
}

export default (state, target) => {
  app({
    root: target,
    state,
    view: (state, actions) => {
      return (
        <div>
          <button onclick={actions.increment}>
            { "increment" }
          </button>{state.count}
        </div>
      );
    },
    events: {
      load: function(state, actions, root) {
        return hydrate(root);
      }
    },
    actions: { 
      increment: (state, actions) => ({
        count: state.count + 1
      })
    }
  });
};
