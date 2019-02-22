import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../hoc/axios-orders';


class BurgerBuilder extends Component {
	state = {
		//ingredients: {},
		totalPrice: 3.99,
		//purchaseable: false,
		ordering: false
	};

	componentDidMount() {
		this.props.onInitIngredients();
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
		if(this.props.isAuthenticated) {
			this.setState({ ordering: true });
		} else {
			this.props.onSetAuthPathRedirect('/checkout')
			this.props.history.push('/auth');
		}
	};

	orderCancelHandler = () => {
		this.setState({ ordering: false });
	};

	orderContinueHandler = () => {
		this.props.onInitPurchase();
		const queryParams = [];
		for(let i in this.state.ingredients){
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push('price=' + this.state.totalPrice);
		// const queryString = queryParams.join('&');

		this.props.history.push('/checkout')
	};

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
		let burger = this.props.error ? "Ingredients can't be loaded" : <Spinner/>
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
											isAuth={this.props.isAuthenticated}
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
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAddIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
		//dispatch({type: actions.ADD_INGREDIENT, payload: ingredientName}),
		onRemoveIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
			//{type: actions.REMOVE_INGREDIENT, payload: ingredientName})
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthPathRedirect: (path) => dispatch(actions.setAuthRedirectPath(path))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
