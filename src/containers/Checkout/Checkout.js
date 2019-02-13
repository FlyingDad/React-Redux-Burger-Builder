import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import './checkout.scss'
import * as actionTypes from '../../store/actions/index'

class Checkout extends Component {
	// state = {
	// 	ingredients: {
	// 		meat: 0,
	// 		salad: 0,
	// 		bacon: 0,
	// 		cheese: 0
	// 	},
	// 	totalPrice: 0
	// }

	// componentWillMount() {
	// 	const query = new URLSearchParams(this.props.location.search);
	// 	const ingredients = {};
	// 	let price = 0;

	// 	for(let param of query.entries()){
	// 		if(param[0] === 'price') {
	// 			price = param[1];
	// 		} else {
	// 			ingredients[param[0]] = +param[1];
	// 		}
	// 	}
	// 	this.setState({ingredients: ingredients, totalPrice: price})

	// }

	checkoutCancelHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinueHandler = () => {
		this.props.history.replace('/checkout/contact-data')
	}

	render() {
		let summary = <Redirect to='/'></Redirect>
		
		if(this.props.ings) {
			const purchasedRedirect = this.props.purchased ? <Redirect to='/'></Redirect> : null;
			summary = (
				<div>
					{purchasedRedirect}
					<CheckoutSummary 
					ingredients={this.props.ings}
					checkoutCancel={this.checkoutCancelHandler}
					checkoutContinue={this.checkoutContinueHandler} 
					/>
					<Route 
							path={this.props.match.path + '/contact-data'} 
							//render={(props) => (<ContactData ingredients={this.props.ings} price={this.props.price} {...props} /> )}
							component={ContactData}
					/>
			</div>)
		}
		return summary
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		purchased: state.order.purchased
	}
}
export default connect(mapStateToProps)(Checkout);