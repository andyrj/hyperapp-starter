import { h } from 'hyperapp';
import { shortid } from 'shortid';

let registered = false;
const registerActions = (state, actions) => {
	actions['todoToggle'] = (state, actions, {id}) => {

	};

	actions['todoAdd'] = (state, actions, {id, text}) => {
	
	};

	actions['todoDelete'] = (state, actions, {id, text}) => {

	};

	actions['todoChangeFilter'] = (state, actions, {filter}) => {

	};
};

export default (state, actions) => {
	return (
		<div>
			Todos, will go here...
		</div>
	);
};
