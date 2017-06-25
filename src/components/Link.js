import { h, app } from 'hyperapp';

const handler = to => event => {
	event.preventDefault();
	history.pushState({}, document.title, to);
};

export default ({to}, children) => {
	const click = handler(to);
	return (
		<a href={to} onclick={click}>{children}</a>
	);
}