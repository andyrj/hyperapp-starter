import { h } from 'hyperapp';
import shortid from 'shortid';
import Header from './Header';
import Counter from './Counter';

export default (state, actions) => {
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
