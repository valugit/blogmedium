import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

export default class Article extends Component {
	constructor(props) {
		super(props)

		this.state = {
			article: null
		}
	}

	componentDidMount() {
		const { match: { params } } = this.props

		return new Promise((resolve) => {
			fetch(`http://blog.etherial.fr/articles/${params.id}`).then((result) => result.json()).then((json) => {
				this.setState({ article: json.data })
				return resolve(json)
			})
		})
	}

	render() {
		const { article } = this.state

		if (article === null) {
			return <div />
		}

		return (
			<section className="article">
				<div>
					<h2>{article.title}</h2>
				</div>
				<div className="article-content">
					<p className="content">{article.content}</p>
					<p className="author">
						By{' '}
						<span>
							{article.User.firstname} {article.User.lastname}
						</span>
					</p>
					{article.created_at !== article.updated_at ? (
						<Moment date={article.updated_at} format="[Last update:] dddd, MMM Do YYYY, [at] HH:mm" />
					) : (
						<Moment date={article.created_at} format="dddd, MMM Do YYYY, [at] HH:mm" />
					)}
					<p className="category">Category: {article.ArticleCategory.name}</p>
				</div>

				<Link to="/">&#9665; Back to the Articles list</Link>
			</section>
		)
	}
}
