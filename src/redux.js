import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

function reducer(state = {}, action) {
	return Object.assign({}, state, action.payload);
}

function action(name, data) {
	return {
		type: name,
		payload: data
	};
}

const composeEnhancers = composeWithDevTools({ action: action });

const store = createStore(
	reducer,
	composeEnhancers()
);

// From within hyperapp action event we should just call store.dispatch({ type: name, payload: data });