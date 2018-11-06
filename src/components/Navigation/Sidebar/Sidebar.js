import React from 'react';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './sidebar.scss';

const Sidebar = props => {

	let attachedClasses = ['Sidebar', 'Close']
	if(props.open) {
		attachedClasses = ['Sidebar', 'Open']
	}

	return (
		<Aux>
			<Backdrop show={props.open} clicked={props.closed}/>
			<div className={attachedClasses.join(' ')}>
				<div className="logo">
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Aux>
	);
};

export default Sidebar;
