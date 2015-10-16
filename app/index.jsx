import React from "react"
import ReactDOM from "react-dom"
import { Router, Route } from "react-router"
import StoresWrapper from "./StoresWrapper"

import App from "containers/App"
import Home from "containers/Home"
import Setup from "containers/Setup"
import NoMatch from "containers/NoMatch"

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="home" component={Home} />
      <Route path="setup" component={Setup} />
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
  ), document.getElementById("content"))
