import React, { Component } from "react"
import Articles from "./articles"

export default class Home extends Component {

	render() {
		return (
      <section>
        <h2>Articles</h2>
        <div className="articles">
          <Articles />
        </div>
      </section>
		);
  }
}