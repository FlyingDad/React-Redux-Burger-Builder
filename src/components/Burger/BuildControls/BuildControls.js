import React from 'react';
import './buildcontrols.scss'
import BuildControl from './BuildControl/BuildControl'

const controls = [
	{ label: 'Salad', type: 'salad'},
	{ label: 'Cheese', type: 'cheese'},
	{ label: 'Bacon', type: 'bacon'},
	{ label: 'Meat', type: 'meat'}
]

const BuildControls = (props) => {
	return (
		<div className="BuildControls">
		<p>Current price: <strong>${props.price.toFixed(2)}</strong></p>
		{controls.map(control => 
			<BuildControl 
				key={control.label} 
				label={control.label} 
				added={() => props.ingredientAdded(control.type)}
				removed={() => props.ingredientRemoved(control.type)}
				disabled={props.disabled[control.type]}
				/>)}
				<button 
					className="OrderButton"
					disabled={!props.purchaseable}
					onClick={props.orderingHandler}
				>{props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER'}</button>
		</div>
	);
};

export default BuildControls;