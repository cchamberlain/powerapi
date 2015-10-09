import React from "react"
import ReactDOM from "react-dom"
import { Router, Route } from "react-router"
import routes from "./routes"
import { stores } from "./stores"

import Application  from "routes/Application"
import Home from "routes/HomePage"
import NoMatch from "routes/NotFoundPage"

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
ReactDOM.render((
  <Router>
    <Route path="/" component={Application}>
      <Route path="home" component={Home}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById("content"))

/*import renderApplication from "./render"
renderApplication(routes, stores, {
  timeout: 600
})
*/
