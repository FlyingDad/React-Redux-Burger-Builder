import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../hoc/axios-orders'
import './contactdata.scss'

class ContactData extends Component {

	state = {
		name: '',
		email: '',
		address: {
			street: '',
			zipCode: ''
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true})
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Mike K',
				address: {
					address: '123 A Ave',
					zip: '12345'
				},
				email: 'mk@gmail.com'
			},
			deliveryMethod: 'pickup'
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

	render() {
		let form =(<form>
			<input type="text" name="name" placeholder="Your name" />
			<input type="email" name="email" placeholder="Your email" />
			<input type="text" name="street" placeholder="Your street" />
			<input type="text" name="zipcode" placeholder="Your zip code" />
			<Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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

export default ContactData;