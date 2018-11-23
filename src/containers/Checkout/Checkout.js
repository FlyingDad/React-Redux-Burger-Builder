import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import './checkout.scss'

class Checkout extends Component {
	state = {
		ingredients: {
			meat: 1,
			salad: 1,
			bacon: 1,
			cheese: 1
		}
	}

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search);
		console.log('asdsd' + query)
		const ingredients = {};
		for(let param of query.entries()){
			ingredients[param[0]] = +param[1];
		}
		this.setState({ingredients: ingredients})

	}

	checkoutCancelHandler = () => {
		console.log('cancel')
		this.props.history.goBack();
	}

	checkoutContinueHandler = () => {
		console.log('continue')
		this.props.history.replace('/checkout/contact-data')
	}

	render() {
		return (
			<div>
				<CheckoutSummary 
					ingredients={this.state.ingredients}
					checkoutCancel={this.checkoutCancelHandler}
					checkoutContinue={this.checkoutContinueHandler}
					/>
				<Route path={this.props.match.path + '/contact-data'} component={ContactData} />
			</div>
		);
	}
}

export default Checkout;