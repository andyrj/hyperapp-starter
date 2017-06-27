import { h } from 'hyperapp';

export default ({id, inc, dec, del}, children) => {
	return (
		<div>
			<button onclick={del}>X</button>
			<span>{children}</span>
			<button onclick={inc}>+</button>
			<button onclick={dec}>-</button>
		</div>
	);
};
