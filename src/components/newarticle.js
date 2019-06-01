import React, { Component } from 'react'

export default class NewArticle extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: null,
			content: null,
			category: null,
			categories: null,
			status: null,
			message: null
		}
	}

	handleSubmit = (event) => {
		event.preventDefault()

		return new Promise((resolve) => {
			fetch('http://blog.etherial.fr/articles', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('id_token')
				},
				body: JSON.stringify({
					title: this.state.title,
					content: this.state.content,
					article_category_id: this.state.category
				})
			})
				.then((result) => result.json())
				.then((json) => {
					this.setState({
						status: 'success',
						message: 'Article successfully created.'
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

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	componentWillMount() {
		return new Promise((resolve) => {
			fetch('http://blog.etherial.fr/articles/categories').then((response) => response.json()).then((json) => {
				this.setState({ categories: json.data })
				return resolve(json)
			})
		})
	}

	render() {
		const { categories } = this.state

		if (categories === null) {
			return <div />
		}

		if (this.state.status === 'success') {
			return (
				<section>
					<h2 className={this.state.status}>{this.state.message}</h2>
				</section>
			)
		}

		return (
			<section>
				<h2>New Article</h2>
				<form className="newarticle" onSubmit={this.handleSubmit}>
					<input type="text" name="title" placeholder="Title goes here..." onChange={this.handleChange} />
					<textarea
						name="content"
						placeholder="Article's content goes here..."
						onChange={this.handleChange}
					/>
					<label for="categories">Select a category</label>
					<select id="categories" name="category" onChange={this.handleChange}>
						<option value={null} />
						{categories.map((category) => {
							return <option value={category.id}>{category.name}</option>
						})}
					</select>
					<button>Post</button>
					<p className={this.state.status}>{this.state.message}</p>
				</form>
			</section>
		)
	}
}
