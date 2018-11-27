import React from 'react';
import { NavLink } from 'react-router-dom'
import './navigationitem.scss'

const NavigationItem = (props) => {
	return (
		<li className='NavigationItem'>
			<NavLink to={props.link} exact>{props.children}</NavLink>
		</li>
	);
};

export default NavigationItem;