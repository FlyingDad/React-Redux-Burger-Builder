import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../hoc/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 1.25,
	bacon: 1.5,
	meat: 2.5
};
class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 3.99,
		purchaseable: false,
		ordering: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		axios.get('https://react-burger-builder-c2db5.firebaseio.com/ingredients.json')
		.then(response => {
			this.setState({ingredients: response.data})
		})
		.catch(error => {
			this.setState({error: true})
		})
	}

	updatePurchaseable = ingredients => {
		const sum = Object.keys(ingredients)
			.map(key => ingredients[key])
			.reduce((prev, curr) => {
				return prev + curr;
			}, 0);
		this.setState({ purchaseable: sum > 0 });
	};

	orderHandler = () => {
		this.setState({ ordering: true });
	};

	orderCancelHandler = () => {
		this.setState({ ordering: false });
	};

	orderContinueHandler = () => {
		const queryParams = [];
		for(let i in this.state.ingredients){
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push('price=' + this.state.totalPrice);
		const queryString = queryParams.join('&');

		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		})
	};

	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const newCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = newCount;
		const price = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = price + oldPrice;
		this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
		this.updatePurchaseable(updatedIngredients);
	};

	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const newCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = newCount;
		const price = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - price;
		this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
		this.updatePurchaseable(updatedIngredients);
	};

	render() {
		const disabledInfo = { ...this.state.ingredients };
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;
		if(this.state.ingredients){
			orderSummary = <OrderSummary
				ingredients={this.state.ingredients}
				orderCanceled={this.orderCancelHandler}
				orderContinued={this.orderContinueHandler}
				price={this.state.totalPrice}
			/>
		}
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		let burger = this.state.error ? "Ingredients can't be loaded" : <Spinner/>
		if(this.state.ingredients){
				burger = <Aux>
									<Burger ingredients={this.state.ingredients} />
									<BurgerControls
											price={this.state.totalPrice}
											purchaseable={this.state.purchaseable}
											ingredientAdded={this.addIngredientHandler}
											ingredientRemoved={this.removeIngredientHandler}
											disabled={disabledInfo}
											orderingHandler={this.orderHandler}
										/>
									</Aux>
		}
		return (
			<Aux>
				<Modal show={this.state.ordering} modalClosed={this.orderCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
