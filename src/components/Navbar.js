import React, {Component} from 'react';
import logo from '../images/logo.svg';
import {FaAlignRight} from 'react-icons/fa';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
	state = {
		isOpen: false
	};

	// old version
	/*handleToggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}*/

	// new version
	/*handleToggle = () => {
		this.setState((state) => {
			return {
				isOpen: !state.isOpen
			}
		})
	}*/

	// new version with destructor
	/*handleToggle = () => {
		this.setState(({isOpen}) => {
			return {
				isOpen: !isOpen
			}
		})
	}*/

	// new version (short cut)
	handleToggle = () => {
		this.setState(({isOpen}) => ({isOpen: !isOpen}) )
	};

	render() {
		return (
			<nav className="navbar">
				<div className="nav-center">
					<div className="nav-header">
						<Link to="/">
							<img src={logo} alt="Beach Resort" />
						</Link>
						<button
							type="button"
							className="nav-btn"
							onClick={this.handleToggle}
						>
							<FaAlignRight className="nav-icon" />
						</button>
					</div>
					<ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/rooms">Rooms</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
