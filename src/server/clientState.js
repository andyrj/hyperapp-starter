import shortid from 'shortid';

export default {
	counters: [{ 
		id: shortid.generate(), 
		count: 0 
	}],
	todos: [{
		id: shortid.generate(), 
		text: 'Finish hyperapp-starter'
	}],
	todoFilter: ''
};
