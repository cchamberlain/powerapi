import React from "react"
import ReactDOM from "react-dom"
import { Router, Route } from "react-router"

import App from "containers/App"
import Home from "containers/Home"
import Endpoints from "containers/Endpoints"
import Remotes from "containers/Remotes"
import NoMatch from "containers/NoMatch"

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="home" component={Home} />
      <Route path="endpoints" component={Endpoints} />
      <Route path="remotes" component={Remotes} />
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>, document.getElementById("root")
)
