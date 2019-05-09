import React, { Component } from 'react'
import { Link } from "react-router-dom"

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
      fetch(`http://blog.etherial.fr/articles/${  params.id }`)
      .then(result => result.json())
      .then(json => this.setState({ article: json.data }))
    })
  }

  render() {
    const { article } = this.state
    
    if (article === null) {
      return (<div></div>)
    }

    return (
      <section className="article">
        <div>
          <h2>{ article.title }</h2>
        </div>
        <div className="article-content">
          <p>{ article.content }</p>
          <p>{ article.User.firstname } { article.User.lastname }</p>
        </div>
        <Link to="/">
          Back to the Articles list
        </Link>
      </section>
    )
  }
}