import React from 'react';

import NavItem from './NavigationItem/NavigationItem'
import './navigationitems.scss'

const NavigationItems = () => {
	return (
		<ul className='NavigationItems'>
			<NavItem link='/' active>
				BurgerBuilder
			</NavItem>
			<NavItem link='/checkout'>
				Checkout
			</NavItem>
		</ul>
	);
};

export default NavigationItems;