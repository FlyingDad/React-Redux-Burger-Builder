import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 1.25,
	bacon: 1.5,
	meat: 2.5
}
class BurgerBuilder extends Component {

	state = {
		ingredients: {
			salad: 1,
			bacon: 1,
			cheese: 2,
			meat: 1,
		},
		totalPrice: 3.99,
		purchaseable: false,
		ordering: false
	}

	updatePurchaseable = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map(key => ingredients[key])
			.reduce((prev, curr) => {
				return prev + curr
			}, 0)
		this.setState({purchaseable: sum > 0})
	}

	orderHandler = () => {
		this.setState({ordering: true})
	}

	orderCancelHandler = () => {
		this.setState({ordering: false})
	}

	orderContinueHandler = () => {
		this.setState({ordering: false})
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const newCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = newCount;
		const price = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = price + oldPrice
		this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
		this.updatePurchaseable(updatedIngredients)
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount <=0){
			return
		}
		const newCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = newCount;
		const price = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - price;
		this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
		this.updatePurchaseable(updatedIngredients)
	}

	render() {
		const disabledInfo = {...this.state.ingredients}
		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return (
			<Aux>
				<Modal show={this.state.ordering} modalClosed={this.orderCancelHandler}>
					<OrderSummary
						ingredients={this.state.ingredients}
						orderCanceled={this.orderCancelHandler}
						orderContinued={this.orderContinueHandler}
					/>
				</Modal>
				<Burger 
					ingredients={this.state.ingredients}
				/>
				<BurgerControls 
					price={this.state.totalPrice}
					purchaseable={this.state.purchaseable}
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					orderingHandler={this.orderHandler}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;