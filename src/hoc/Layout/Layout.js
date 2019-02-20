import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';
import './layout.scss';

class Layout extends Component {

	state = {
		showSidebar: false
	}
	
	sidebarClosedHandler = () => {
		this.setState({showSidebar: false})
	}

	sidebarOpenHandler = () => {
		this.setState((prevState) => {
			return {showSidebar: !prevState.showSidebar}
		})
	}

	render() {
		return (
			<Aux>
				<Toolbar 
					isAuth={this.props.isAuthenticated}
					menuClick={this.sidebarOpenHandler}
				/>
				<main className="Layout">{this.props.children}</main>
				<Sidebar 
					closed={this.sidebarClosedHandler} 
					open={this.state.showSidebar} 
					isAuth={this.props.isAuthenticated}
					/>
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token != null
	}
}

export default connect(mapStateToProps, null)(Layout);
