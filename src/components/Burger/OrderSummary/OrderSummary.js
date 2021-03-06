import React from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients)
		.map(key => {
			return <li key={key}><span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}</li>
		});
	
	return (
		<Aux>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p>Total price: ${props.price.toFixed(2)}</p>
			<p>Continue to Checkout</p>
			<Button btnType="Danger" clicked={props.orderCanceled}>CANCEL</Button>
			<Button btnType="Success" clicked={props.orderContinued}>CONTINUE</Button>
		</Aux>
	);
};

export default OrderSummary;