import React from 'react';
import Burger from '../../Burger/Burger'
import '../../UI/Button/Button'
import './checkoutsummary.scss'
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
	return (
		<div className="Checkoutsummary">
			<h1>We hope it tastes great!</h1>
			<div style={{width: '100%', margin: 'auto'}}>
				<Burger
					ingredients={props.ingredients}
				/>

				<Button 
					btnType="Danger"
					clicked={props.checkoutCancel}
				>CANCEL</Button>
				<Button 
					btnType="Success"
					clicked={props.checkoutContinue}
				>CONTINUE</Button>
			</div>
		</div>
	);
};

export default CheckoutSummary;