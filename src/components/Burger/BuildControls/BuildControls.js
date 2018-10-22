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
		{controls.map(control => 
			<BuildControl 
				key={control.label} 
				label={control.label} 
				added={() => props.ingredientAdded(control.type)}
				removed={() => props.ingredientRemoved(control.type)}
				disabled={props.disabled[control.type]}
				/>)}
		</div>
	);
};

export default BuildControls;