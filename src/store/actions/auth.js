import * as actionTypes from './actionsTypes';
import axios from 'axios'

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START

	}
}

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId 
	}
}

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	}
}

export const auth = (email, password, isSignUp) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true

		}
		// default is signup
		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB1D_DQKxFbCsXBMboymZHFGuB1KgU64C8'
		// sign in
		if(!isSignUp) {
			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB1D_DQKxFbCsXBMboymZHFGuB1KgU64C8'
		}

		axios.post(url, authData)
		.then(res => {
			console.log(res.data);
			const token = res.data.idToken;
			const userId = res.data.localId
			dispatch(authSuccess(token, userId));

		})
		.catch(err => {
			console.log(err.response.data);
			dispatch(authFail(err));
		})
	}
}