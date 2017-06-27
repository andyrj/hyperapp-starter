import { h } from 'hyperapp';
import Header from './Header';

export default (state, actions) => {
	return (
		<div>
			<Header state={state} actions={actions} />
			Todos, will go here...
		</div>
	);
};
