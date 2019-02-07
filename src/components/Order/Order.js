import React from 'react';
import './order.scss'

const Order = (props) => {
	let ingredients=[];
	console.log(props)
	for(let ingredient in props.ingredients){
		ingredients.push({name: ingredient, amount: props.ingredients[ingredient]})
	}

	const ingredientOutput = ingredients.map(ingredient => {
		return <span 
				key={ingredient.name}>{ingredient.name}: {ingredient.amount} 
			</span>;
	})

	return (
		<div className="Order">	
			<p>Ingredients: {ingredientOutput} </p>
			<p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
		</div>
	);
};

export default Order;