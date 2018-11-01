import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import './toolbar.scss'

const Toolbar = () => {
	return (
		<header className='Toolbar'>
			<div>Menu</div>
			<div className='logo'>
				<Logo />
			</div>
			
			<nav className='DesktopOnly'>
				<NavigationItems />
			</nav>
		</header>
	);
};

export default Toolbar;