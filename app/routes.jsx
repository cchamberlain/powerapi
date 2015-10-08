import React from "react"
import { Route, IndexRoute } from "react-router"

/* eslint-disable no-multi-spaces */
import Application  from "routes/Application"
import Home from "routes/HomePage"
import NoMatch from "routes/NotFoundPage"
/* eslint-enable */

// polyfill
if(!Object.assign)
  Object.assign = React.__spread // eslint-disable-line no-underscore-dangle

// export routes
let Routes = (
  <Route path="/" component={Application}>
    <IndexRoute handler={Home}/>
    <Route path="*" component={NoMatch} />
  </Route>
)

export default Routes
