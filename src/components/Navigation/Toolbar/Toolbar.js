import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import './toolbar.scss'

const Toolbar = (props) => {
	return (
		<header className='Toolbar'>
			<div 
				className="hamburger"
				onClick={props.menuClick}>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div className='logo'>
				<Logo />
			</div>
			
			<nav className='DesktopOnly'>
				<NavigationItems 
					isAuthenticated={props.isAuth}
				/>
			</nav>
		</header>
	);
};

export default Toolbar;