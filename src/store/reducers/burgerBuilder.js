import * as actions from '../actions/actionsTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 1.25,
	bacon: 1.5,
	meat: 2.5
};

const initialState = {
	ingredients: null,
	totalPrice: 3.99,
	error: false
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.ADD_INGREDIENT:
			const updatedIngredient = {[payload]: state.ingredients[payload] + 1};
			const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
			const updatedState = {
				ingredients: updatedIngredients,
				totalPrice: state.totalPrice + INGREDIENT_PRICES[payload]
			}
			return updateObject(state, updatedState);

		case actions.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[payload]: state.ingredients[payload] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[payload]
			};

		case actions.SET_INGREDIENTS:
			return {
				...state,
				ingredients: payload,
				error: false,
				totalPrice: 3.99
			};

		case actions.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true
			}

		default:
			return state;
	}
};
