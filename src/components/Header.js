import { h, app } from 'hyperapp';
import Link from './Link';

export default () => {
	return (
		<ul>
			<li><Link to='/'>{'Home'}</Link></li>
			<li><Link to='/test'>{'Test'}</Link></li>
		</ul>		
	);
};
