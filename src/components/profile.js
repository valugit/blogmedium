import React, { Component } from 'react'
import avatar from './../img/avatar.svg'
import Moment from 'react-moment'

export default class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			profile: null,
			firstname: null,
			lastname: null,
			birthdate: null,
			password_old: null,
			password_new: null,
			password_new_verif: null,
			infoStatus: null,
			infoMessage: null,
			pwdStatus: null,
			pwdMessage: null
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	componentDidMount() {
		return new Promise((resolve) => {
			fetch('http://blog.etherial.fr/users/me', {
				headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') }
			})
				.then((result) => result.json())
				.then((json) => {
					this.setState({
						profile: json.data,
						firstname: json.data.firstname,
						lastname: json.data.lastname,
						birthdate: new Date(json.data.birthdate).toISOString()
					})
					return resolve(json)
				})
		})
	}

	updateInfo = (event) => {
		event.preventDefault()

		return new Promise((resolve) => {
			fetch('http://blog.etherial.fr/users/me', {
				method: 'PUT',
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('id_token'),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					firstname: this.state.firstname,
					lastname: this.state.lastname,
					birthdate: this.state.birthdate
				})
			})
				.then((result) => result.json())
				.then((json) => {
					this.setState({
						infoStatus: 'success',
						infoMessage: 'Informations successfully updated.'
					})
					setTimeout(() => {
						window.location.reload()
					}, 1000)
					return resolve(json)
				})
				.catch((json) => {
					this.setState({
						infoStatus: 'error',
						infoMessage: "Couldn't update informations. Informations invalid."
					})
					return resolve(json)
				})
		})
	}

	updatePassword = (event) => {
		event.preventDefault()

		return new Promise((resolve) => {
			fetch('http://blog.etherial.fr/users/me/password', {
				method: 'PUT',
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('id_token'),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					password_old: this.state.password_old,
					password_new: this.state.password_new,
					password_new_verif: this.state.password_new_verif
				})
			})
				.then((result) => result.json())
				.then((json) => {
					if (json.errors) {
						this.setState({
							pwdStatus: 'error',
							pwdMessage: "Couldn't update password. Informations invalid."
						})
						return resolve(json)
					}

					this.setState({
						pwdStatus: 'success',
						pwdMessage: 'Password successfully updated.'
					})
					setTimeout(() => {
						window.location.reload()
					}, 1000)
					return resolve(json)
				})
		})
	}

	render() {
		const { profile } = this.state

		if (profile === null) {
			return <div />
		}

		return (
			<section>
				<h2>Profile</h2>
				<div id="profile">
					<div className="informations">
						<img src={profile.picture !== 'default.jpg' ? profile.picture : avatar} alt="Profile picture" />
						<div>
							<span>
								{profile.firstname} {profile.lastname}
							</span>
						</div>
						<div>
							{profile.birthdate ? (
								<Moment date={profile.birthdate} format="[Birthdate:] MMM Do YYYY" />
							) : (
								'No birthdate registered yet'
							)}
						</div>
					</div>
					<div className="update">
						<h3>Update personal informations</h3>
						<form onSubmit={this.updateInfo}>
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
							<input type="date" name="birthdate" onChange={this.handleChange} />
							<button type="submit">Update</button>
							<p className={this.state.infoStatus}>{this.state.infoMessage}</p>
						</form>

						<h3>Update password</h3>
						<form onSubmit={this.updatePassword}>
							<input
								type="password"
								name="password_old"
								placeholder="Password goes here..."
								onChange={this.handleChange}
							/>
							<input
								type="password"
								name="password_new"
								placeholder="Password goes here..."
								onChange={this.handleChange}
							/>
							<input
								type="password"
								name="password_new_verif"
								placeholder="Password goes here... Again..."
								onChange={this.handleChange}
							/>
							<button type="submit">Update</button>
							<p className={this.state.pwdStatus}>{this.state.pwdMessage}</p>
						</form>
					</div>
				</div>
			</section>
		)
	}
}
