import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import './App.scss';

class App extends Component {
  render() {
    return (

      <div className="App">
				<Layout>					
						<Route path="/" exact component={BurgerBuilder} />
						<Route path="/checkout" component={Checkout}/>
				</Layout>
      </div>

    );
  }
}

export default App;
