import React, { Component } from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Home from "./components/home"
import Article from "./components/article"
import SignIn from "./components/signin"
import SignUp from "./components/signup"
import NewArticle from "./components/newarticle"
import Profile from "./components/profile"
import Navbar from "./components/navbar"

class App extends Component {
  render() {
    return (
      <Router>
        <main className="App">
          <header>
            <h1>BlogMedium</h1>
            <Navbar />
          </header>
          <Route exact path={"/signin"}  component={SignIn} />
          <Route exact path={"/signup"}  component={SignUp} />
          <Route exact path={"/articles/:id"}  component={Article} />
          <Route exact path={"/new-article"}  component={NewArticle} />
          <Route exact path={"/profile"}  component={Profile} />
          <Route exact path={'/'}  component={Home} />
        </main>
      </Router>
    );
  }
}

export default App
