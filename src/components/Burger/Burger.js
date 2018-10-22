import React from 'react';
import Ingredient from './Ingredient/Ingredient'
import './burger.scss'

const Burger = (props) => {

	let selectedIngredients = Object.keys(props.ingredients)
		.map(key => {
			return [...Array(props.ingredients[key])]
			.map((_, i) => {
				return <Ingredient key={key + i} type={key} />
			})
			
		})//if it reduces to zero elements, then we create p (below)
		.reduce((prev, curr) => {
			return prev.concat(curr)
		}, [])
		if(selectedIngredients.length === 0){
			selectedIngredients[0] = <p>Please add some ingredients!</p>
		}
	
	return (
		<div className="Burger">
			<Ingredient 
				type="bread-top"
			/>
			{selectedIngredients}
			<Ingredient 
				type="bread-bottom"
			/>
		</div>
	);
};

export default Burger;