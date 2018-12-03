import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../hoc/axios-orders'
import Input from '../../../components/UI/Input/input'
import './contactdata.scss'

class ContactData extends Component {

	state = {
		orderForm: {
				name: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Your name'
					},
					value: '',
					validation: {
						required: true,
						touched: false,
						valid: false
					}
				},
				address: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Street address'
					},
					value: '',
					validation: {
						required: true,
						touched: false,
						valid: false
					}
				},
				zip: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Zipcode'
					},
					value: '',
					validation: {
						required: true,
						touched: false,
						minLength: 5,
						valid: false
					}
				},
				city: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'City'
					},
					value: '',
					validation: {
						required: true,
						touched: false,
						valid: false
					}
				},
				email: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Email'
					},
					value: '',
					validation: {
						required: true,
						touched: false,
						valid: false
					}
				},
				deliveryMethod: {
					elementType: 'select',
					elementConfig: {
						options: [
							{value: 'fastest', displayValue: 'Fastest'},
							{value: 'cheapest', displayValue: 'Cheapest'}
						]
					},
					value: 'fastest',
					validation: {
						valid: true
					}
				}
		},
		formIsValid: false,
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true})

		// get form data
		const formData = {};
		for(let formElementId in this.state.orderForm){
			formData[formElementId] = this.state.orderForm[formElementId].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData
		};

		axios
			.post('/orders.json', order)
			.then(response => {
				this.setState({loading: false})
				this.props.history.push('/');
			})
			.catch(error => {
				console.log(error);
				this.setState({loading: false})
			});
	}

	inputChangedHandler = (event, inputID) => {
		// console.log(event.target.value, inputID);
		// shallow copy, will not copy sub objects
		const updatedOrderForm = { ...this.state.orderForm}
		//deep copy
		const updatedFormElement = {...updatedOrderForm[inputID]}
		updatedFormElement.value = event.target.value;
		updatedFormElement.validation.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.validation.touched = true;
		// console.log(updatedFormElement.validation.valid)
		updatedOrderForm[inputID] = updatedFormElement;

		//check overall form validity
		let formIsValid = true;
		for(let inputId in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputId].validation.valid && formIsValid;
		}
		// console.log(formIsValid)
		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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

	render() {

		const formElementsArray = [];
		for(let key in this.state.orderForm){
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		let form =(<form onSubmit={this.orderHandler}>
			{/* <Input elementType='...' elementConfig='...' value='booyay' /> */}
			{formElementsArray.map(formElement => (
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
			))}
			<Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
		</form>);
		if(this.state.loading) {
			form = <Spinner />
		}
		return (
			<div className="Contactdata">
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
		price: state.totalPrice
	}
}

export default connect(mapStateToProps)(ContactData);