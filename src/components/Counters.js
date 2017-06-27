import { h } from 'hyperapp';
import shortid from 'shortid';
import Header from './Header';
import Counter from './Counter';

let registered = false;
const registerActions = (actions) => {
	actions['counterInc'] = (state, actions, {id}) => {
		state.counters = state.counters.map(counter => {
			if (counter.id === id) {
				return Object.assign({}, counter, {count: counter.count + 1});
			} else {
				return counter;
			}
		});
		return state;
	};
	actions['counterDec'] = (state, actions, {id}) => {
		state.counters = state.counters.map(counter => {
			if (counter.id === id) {
				return Object.assign({}, counter, {count: counter.count + 1});
			} else {
				return counter;
			}
		});
		return state;
	};
	actions['counterDel'] = (state, actions, {id}) => {
		let index = -1;
		state.counters.forEach((counter, i) => {
			if (counter.id === id) {
				index = i;
			}
		});
		state.counters = [
			...state.counters.slice(0, index),
			...state.counters.slice(index + 1)
		];
		return state;
	};
	registered = true;
};

export default (state, actions) => {
	if (!registered) {
		registerActions(actions);
	}
	return (
		<div>
			<Header />
			{state.counters.map(({id, count}) => {
				return (
					<Counter id={id} 
						inc={actions.counterInc({id})} 
						dec={actions.counterDec({id})} 
						del={actions.counterDel({id})}
					>{count}</Counter>
				);
			})}
		</div>
	);
};
