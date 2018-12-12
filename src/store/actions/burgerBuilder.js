import * as actionTypes from '../actions/actionsTypes';
import axios from '../../hoc/axios-orders';

export const addIngredient = (ingName) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		payload: ingName
	}
}

export const removeIngredient = (ingName) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		payload: ingName
	}
}

export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		payload: ingredients
	}
}

const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	}
}

export const initIngredients = () => {
	return dispatch => {
		axios.get('https://react-burger-builder-c2db5.firebaseio.com/ingredients.json')
		.then(response => {
			dispatch(setIngredients(response.data));
		})
		.catch(error => {
			dispatch(fetchIngredientsFailed());
		})
	}
}