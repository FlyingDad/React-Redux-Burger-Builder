import React from 'react';
import './logo.scss';
import logo from '../../assets/images/burger-logo.png'

const Logo = (props) => {
	return (
		<div className='Logo'>
			<img src={logo} alt='Burger Logo' />
		</div>
	);
};

export default Logo;