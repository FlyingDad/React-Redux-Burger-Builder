import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../hoc/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux';
import * as actions from '../../store/actions'


class BurgerBuilder extends Component {
	state = {
		//ingredients: {},
		totalPrice: 3.99,
		//purchaseable: false,
		ordering: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		// axios.get('https://react-burger-builder-c2db5.firebaseio.com/ingredients.json')
		// .then(response => {
		// 	this.setState({ingredients: response.data})
		// })
		// .catch(error => {
		// 	this.setState({error: true})
		// })
	}

	updatePurchaseable = () => {
		const sum = Object.keys(this.props.ings)
			.map(key => this.props.ings[key])
			.reduce((prev, curr) => {
				return prev + curr;
			}, 0);
		//this.setState({ purchaseable: sum > 0 });
		return sum > 0;
	};

	orderHandler = () => {
		this.setState({ ordering: true });
	};

	orderCancelHandler = () => {
		this.setState({ ordering: false });
	};

	orderContinueHandler = () => {
		// const queryParams = [];
		// for(let i in this.state.ingredients){
		// 	queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		// }
		// queryParams.push('price=' + this.state.totalPrice);
		// const queryString = queryParams.join('&');

		this.props.history.push('/checkout')
	};

	// addIngredientHandler = type => {
	// 	const oldCount = this.state.ingredients[type];
	// 	const newCount = oldCount + 1;
	// 	const updatedIngredients = {
	// 		...this.state.ingredients
	// 	};
	// 	updatedIngredients[type] = newCount;
	// 	const price = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = price + oldPrice;
	// 	this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
	// 	this.updatePurchaseable(updatedIngredients);
	// };

	// removeIngredientHandler = type => {
	// 	const oldCount = this.state.ingredients[type];
	// 	if (oldCount <= 0) {
	// 		return;
	// 	}
	// 	const newCount = oldCount - 1;
	// 	const updatedIngredients = {
	// 		...this.state.ingredients
	// 	};
	// 	updatedIngredients[type] = newCount;
	// 	const price = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice - price;
	// 	this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
	// 	this.updatePurchaseable(updatedIngredients);
	// };

	render() {
		const disabledInfo = { ...this.props.ings };
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;
		if(this.props.ings){
			orderSummary = <OrderSummary
				ingredients={this.props.ings}
				orderCanceled={this.orderCancelHandler}
				orderContinued={this.orderContinueHandler}
				price={this.props.price}
			/>
		}
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		let burger = this.state.error ? "Ingredients can't be loaded" : <Spinner/>
		if(this.props.ings){
				burger = <Aux>
									<Burger ingredients={this.props.ings} />
									<BurgerControls
											price={this.props.price}
											purchaseable={this.updatePurchaseable()}
											ingredientAdded={this.props.onAddIngredient}
											ingredientRemoved={this.props.onRemoveIngredient}
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

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAddIngredient: (ingredientName) => dispatch({type: actions.ADD_INGREDIENT, payload: ingredientName}),
		onRemoveIngredient: (ingredientName) => dispatch({type: actions.REMOVE_INGREDIENT, payload: ingredientName})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
