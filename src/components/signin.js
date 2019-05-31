import React, { Component } from 'react'

export default class SignIn extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: ``,
			password: ``,
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
			fetch('http://blog.etherial.fr/auth', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password
				})
			})
				.then((result) => result.json())
				.then((json) => {
					this.setToken(json.data.token)
					this.setState({
						status: 'success',
						message: 'Connected.'
					})
					setTimeout(() => {
						this.props.history.replace('/')
						window.location.reload()
					}, 1000)
					resolve(json.data.token)
				})
				.catch((json) => {
					this.setState({
						status: 'error',
						message: 'Mail or Password invalid.'
					})
					resolve(json)
				})
		})
	}

	setToken(idToken) {
		localStorage.setItem('id_token', idToken)
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
				<h2>Sign In</h2>
				<form className="signin" onSubmit={this.handleSubmit}>
					<input type="email" name="email" placeholder="Email goes here..." onChange={this.handleChange} />
					<input
						type="password"
						name="password"
						placeholder="Password goes here..."
						onChange={this.handleChange}
					/>
					<button type="submit">Sign In</button>
					<p className={this.state.status}>{this.state.message}</p>
				</form>
			</section>
		)
	}
}
