import React, { Component } from "react"

export default class SignIn extends Component {

	constructor(props) {
		super(props)
		this.state = { 
			email: ``,
			password: ``,
		}
	}

	handleChange = event => {

		this.setState({ 
			[event.target.name]:event.target.value 
		})
	}

	handleSubmit = event => {

		event.preventDefault()
		
		return new Promise((resolve) => {
      fetch("http://blog.etherial.fr/auth", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify ({
					email: this.state.email,
					password: this.state.password
				})
			})
			.then(result => result.json())
      .then(json => {
				console.log(json)
				this.setToken(json.data.token)
				this.props.history.replace('/')
        return Promise.resolve(json)
			})
    })
	}

	setToken(idToken) {
		localStorage.setItem("id_token", idToken)
	}

	render() {
		return (
      <section>
        <h2>Sign In</h2>
				<form className="signin" onSubmit={this.handleSubmit} >
					<input type="email" name="email" placeholder="Email goes here..." onChange={this.handleChange} />
					<input type="password" name="password" placeholder="Password goes here..." onChange={this.handleChange} />
					<button type="submit">Sign In</button>
				</form>
      </section>
		);
	}
}