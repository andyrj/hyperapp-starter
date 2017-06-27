import { h } from 'hyperapp';
import shortid from 'shortid';
import Header from './Header';
import Counter from './Counter';

export default (state, actions) => {
	return (
		<div>
			<Header state={state} actions={actions} />
			<button onclick={actions.counters.add}>Add</button>
			{state.counters.map((counter) => {
				console.log(state);
				const id = counter.id;
				const count = counter.count;
				return (
					<Counter id={id} 
						inc={actions.counter.increment({id})} 
						dec={actions.counter.decrement({id})} 
						del={actions.counters.remove({id})}
					>{count}</Counter>
				);
			})}
		</div>
	);
};
