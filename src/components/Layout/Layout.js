import React from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Sidebar from '../Navigation/Sidebar/Sidebar'
import './layout.scss'

const Layout = props => {
	return (
		<Aux>
			<Toolbar />
			<div>Sidebar, backdrop</div>
			<main className="Layout">{props.children}</main>
			<Sidebar />
		</Aux>
	);
};

export default Layout;
