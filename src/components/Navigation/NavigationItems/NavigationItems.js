import React from 'react';

import NavItem from './NavigationItem/NavigationItem'
import './navigationitems.scss'

const NavigationItems = () => {
	return (
		<ul className='NavigationItems'>
			<NavItem link='/'>
				BurgerBuilder
			</NavItem>
			<NavItem link='/orders'>
				Orders
			</NavItem>
			<NavItem link='/auth'>
				Login
			</NavItem>
		</ul>
	);
};

export default NavigationItems;