import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Auth.scss';

export class Auth extends Component {

	state = {
		controls: {
				email: {
					elementType: 'input',
					elementConfig: {
						type: 'email',
						placeholder: 'Email address'
					},
					value: '',
					validation: {
						required: true,
						isEMail: true
					},
					valid: false,
					touched: false
				},
				password: {
					elementType: 'input',
					elementConfig: {
						type: 'password',
						placeholder: 'Password'
					},
					value: '',
					validation: {
						required: true,
						minLength: 6
					},
					valid: false,
					touched: false
				}
		},
		isSignUp: true
	}

	componentDidMount() {
		if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath()
		}
	}

	inputChangedHandler = (event, controlName) => {
		// console.log(event.target.value, controlName);
		// shallow copy, will not copy sub objects
		const updatedcontrols = { ...this.state.controls}
		//deep copy
		const updatedFormElement = {...updatedcontrols[controlName]}
		updatedFormElement.value = event.target.value;
		updatedFormElement.validation.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.validation.touched = true;
		// console.log(updatedFormElement.validation.valid)
		updatedcontrols[controlName] = updatedFormElement;

		//check overall form validity
		let formIsValid = true;
		for(let controlName in updatedcontrols) {
			formIsValid = updatedcontrols[controlName].validation.valid && formIsValid;
		}
		// console.log(formIsValid)
		this.setState({controls: updatedcontrols, formIsValid: formIsValid});
	}

	checkValidity = (value, rules) => {

		// look for npm form validators

		let isValid = false;
		if(rules.required){
			isValid = value.trim() !== '';
		}
		if(rules.minLength){
			isValid = value.trim().length >= rules.minLength;
		}
		return isValid;
	}

	onSubmitHandler = (event) => {
		event.preventDefault();
		// console.log(event)
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
	}

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {
				isSignUp: !prevState.isSignUp
			}
		})
	}

	render() {

		const formElementsArray = [];
		for(let key in this.state.controls){
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		let form = formElementsArray.map(formElement => {
			return (
				<Input
					key={formElement.id}
					elementType={formElement.config.elementType} 
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
					placeholder={formElement.config.elementConfig.placeholder}
					changed={(event) => this.inputChangedHandler(event, formElement.id)}
					invalid={!formElement.config.validation.valid}
					touched={formElement.config.validation.touched}
				/>
			)
		})

		if (this.props.loading) {
			form = <Spinner />
		}

		let errorMessage = null;
		if (this.props.error) {
			errorMessage = (
				<p>{this.props.error.message}</p>
			);
			console.log('ERROR: ' ,this.props.error.message)
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {

			authRedirect = <Redirect to={this.props.authRedirectPath}/>;
		}

		return (
			<div className='Auth'>
				{authRedirect}
				{errorMessage}
				<form onSubmit={this.onSubmitHandler}>
					{form}
					<Button type='button' btnType='Warning' name='signup'>
						SUBMIT
					</Button>
				</form>
				<Button btnType='Success' clicked={this.switchAuthModeHandler}>
						SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
				</Button>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error:  state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
