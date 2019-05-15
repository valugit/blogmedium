import React, { Component } from "react"
import { NavLink } from "react-router-dom"

export default class Navbar extends Component {

  handleSubmit = event => {
    localStorage.removeItem('id_token')
  }

  render() {
    if (localStorage.getItem("id_token")) {    
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
              <form onSubmit={this.handleSubmit}>
                <button className="signout">
                  Sign Out
                </button>
              </form>
            </li>
          </ul>
        </nav>
      )
    } else {
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
  }

}