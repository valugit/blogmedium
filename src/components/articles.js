import React, { Component } from "react"
import { Link } from "react-router-dom"
import Moment from "react-moment"

export default class Articles extends Component {

  constructor(props) {
    super(props)
    this.state = {
      articles: []
    }
  }
  
  componentDidMount() {
    return new Promise((resolve) => {
      fetch("http://blog.etherial.fr/articles")
      .then(result => result.json())
      .then(json => this.setState({ articles: json.data }))
    })
  }

	render() {
    const { articles } = this.state

		return (
      <ul>
        { articles.map(article => 
          <li className="home-article radial-out">
            <Link to={`/articles/${ article.id }`} className="link">
              { article.title.length > 75 ? <h3>{ article.title.slice(0, 75)}...</h3> : <h3>{ article.title }</h3> }
              <p>
                Created by { article.User.firstname } { article.User.lastname }
              </p>
              <Moment date={ article.created_at } format="dddd, MMM Do YYYY, [at] HH:mm"/>
              { article.created_at !== article.updated_at ? <Moment date={ article.updated_at } format="[Last update:] dddd, MMM Do YYYY, [at] HH:mm"/> : null } 
              <p>
                Category: { article.ArticleCategory.name }
              </p>
            </Link>
          </li>
        )}
      </ul>
		);
  }
}