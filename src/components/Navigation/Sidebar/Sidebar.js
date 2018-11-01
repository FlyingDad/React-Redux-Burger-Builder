import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import './sidebar.scss'

const Sidebar = (props) => {
	return (
		<div className='Sidebar'>
			<div className='logo'>
				<Logo />
			</div>
			<nav>
				<NavigationItems />
			</nav>
		</div>
	);
};

export default Sidebar;