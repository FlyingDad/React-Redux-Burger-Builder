import * as actions from './actions'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 1.25,
	bacon: 1.5,
	meat: 2.5
};

const initialState = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 3.99
}

export default (state = initialState, { type, payload }) => {
	switch (type) {

	case actions.ADD_INGREDIENT:

		return { 
			...state, 
			ingredients: {
				...state.ingredients,
				[payload]: state.ingredients[payload] + 1
			},
			totalPrice: state.totalPrice + INGREDIENT_PRICES[payload]
		}

	case actions.REMOVE_INGREDIENT:
		return { ...state, 
			ingredients: {
				...state.ingredients,
				[payload]: state.ingredients[payload] - 1
			},
			totalPrice: state.totalPrice - INGREDIENT_PRICES[payload]
		}

	default:
		return state
	}
}
