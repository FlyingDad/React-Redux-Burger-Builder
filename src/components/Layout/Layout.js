import React from 'react';
import Aux from '../../hoc/Aux';
import './layout.scss'

const Layout = props => {
	return (
		<Aux>
			<div>Toolbar, Sidebar, backdrop</div>
			<main className="Layout">{props.children}</main>
		</Aux>
	);
};

export default Layout;
