import React, { Component } from "react"
import { NavLink } from "react-router-dom"

export default class Navbar extends Component {

  render() {
    if (false) {    
      return (
        <nav>
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="selected">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/" activeClassName="selected">
                Create
              </NavLink>
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
                <span className="underline"></span>
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/signin" activeClassName="selected">
                Sign In
                <span className="underline"></span>
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/signup" activeClassName="selected">
                Sign Up
                <span className="underline"></span>
              </NavLink>
            </li>
          </ul>
        </nav>
      )
    }
  }

}