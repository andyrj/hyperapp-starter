import { h } from 'hyperapp';
import shortid from 'shortid';
import Header from './Header';
import Counter from './Counter';

const getIncrementer = (actions, id) => (event) => {
	actions.counter.increment({id});
};

const getDecrementer = (actions, id) => (event) => {
	actions.counter.decrement({id});
};

const getRemover = (actions, id) => (event) => {
	actions.counters.remove({id});
};

export default (state, actions) => {
	
	return (
		<div>
			<Header state={state} actions={actions} />
			<button onclick={actions.counters.add}>Add</button>
			{state.counters.map((counter) => {
				const id = counter.id;
				const count = counter.count;
				return (
					<Counter id={id} 
						inc={getIncrementer(actions, id)} 
						dec={getDecrementer(actions, id)} 
						rem={getRemover(actions, id)}
					>{count}</Counter>
				);
			})}
		</div>
	);
};
