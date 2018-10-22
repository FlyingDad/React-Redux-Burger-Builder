import React from 'react';
import Ingredient from './Ingredient/Ingredient'
import './burger.scss'

const Burger = () => {
	return (
		<div className="Burger">
			<Ingredient 
				type="bread-top"
			/>
			<Ingredient 
				type="cheese"
			/>
			<Ingredient 
				type="meat"
			/>
			<Ingredient 
				type="bread-bottom"
			/>
		</div>
	);
};

export default Burger;