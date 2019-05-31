import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Navbar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			connected: localStorage.getItem('id_token')
		}
	}

	handleClick = () => {
		localStorage.removeItem('id_token')
		this.props.history.replace('/')
		window.location.reload()
	}

	render() {
		const { connected } = this.state

		if (connected === null) {
			return (
				<nav>
					<ul>
						<li>
							<NavLink exact to="/" activeClassName="selected">
								Home
							</NavLink>
						</li>
						<li>
							<NavLink exact to="/signin" activeClassName="selected">
								Sign In
							</NavLink>
						</li>
						<li>
							<NavLink exact to="/signup" activeClassName="selected">
								Sign Up
							</NavLink>
						</li>
					</ul>
				</nav>
			)
		}

		return (
			<nav>
				<ul>
					<li>
						<NavLink exact to="/" activeClassName="selected">
							Home
						</NavLink>
					</li>
					<li>
						<NavLink exact to="/new-article" activeClassName="selected">
							New Article
						</NavLink>
					</li>
					<li>
						<NavLink exact to="/profile" activeClassName="selected">
							My Account
						</NavLink>
					</li>
					<li>
						<NavLink exact to="/" onClick={this.handleClick}>
							Sign Out
						</NavLink>
					</li>
				</ul>
			</nav>
		)
	}
}
