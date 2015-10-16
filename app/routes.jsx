import React from "react"
import { Route, IndexRoute } from "react-router"

/* eslint-disable no-multi-spaces */
import App from "routes/App"
import Home from "routes/Home"
import NoMatch from "routes/NoMatch"
/* eslint-enable */

// polyfill
if(!Object.assign)
  Object.assign = React.__spread // eslint-disable-line no-underscore-dangle

// export routes
let Routes = (
  <Route path="/" component={App}>
    <IndexRoute handler={Home}/>
    <Route path="*" component={NoMatch} />
  </Route>
)

export default Routes
