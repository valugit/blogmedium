import React, { Component } from 'react'

export default class SignUp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			firstname: ``,
			lastname: ``,
			email: ``,
			password: ``,
			passwordVerif: ``,
			status: null,
			message: null
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()

		return new Promise((resolve) => {
			fetch('http://blog.etherial.fr/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					firstname: this.state.firstname,
					lastname: this.state.lastname,
					email: this.state.email,
					password: this.state.password,
					password_verif: this.state.passwordVerif
				})
			})
				.then((result) => result.json())
				.then((json) => {
					this.setState({
						status: 'success',
						message: 'Account successfully created.'
					})
					setTimeout(() => {
						this.props.history.replace('/')
					}, 1000)
					resolve(json.data)
				})
				.catch((json) => {
					this.setState({
						status: 'error',
						message: 'Informations invalid or missing.'
					})
					resolve(json)
				})
		})
	}

	render() {
		if (this.state.status === 'success') {
			return (
				<section>
					<h2 className={this.state.status}>{this.state.message}</h2>
				</section>
			)
		}
		return (
			<section>
				<h2>Sign Up</h2>
				<form className="signup" onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="firstname"
						placeholder="Firstname goes here..."
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="lastname"
						placeholder="Lastname goes here..."
						onChange={this.handleChange}
					/>
					<input type="email" name="email" placeholder="Email goes here..." onChange={this.handleChange} />
					<input
						type="password"
						name="password"
						placeholder="Password goes here..."
						onChange={this.handleChange}
					/>
					<input
						type="password"
						name="passwordVerif"
						placeholder="Password goes here... Again..."
						onChange={this.handleChange}
					/>
					<button type="submit">Sign Up</button>
					<p className={this.state.status}>{this.state.message}</p>
				</form>
			</section>
		)
	}
}
