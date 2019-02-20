import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/logout/Logout'
import './App.scss';

class App extends Component {
  render() {
    return (

      <div className="App">
				<Layout>					
						<Route path="/" exact component={BurgerBuilder} />
						<Route path="/checkout" component={Checkout}/>
						<Route path="/auth" component={Auth}/>
						<Route path="/logout" component={Logout} />
						<Route path="/orders" component={Orders}/>
				</Layout>
      </div>
    );
  }
}

export default App;
