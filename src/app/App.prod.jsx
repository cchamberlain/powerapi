import 'app/fonts/fout'

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'
import { Provider } from 'react-redux'
import DevTools from './containers/DevTools'

import Powerapi from './containers/Powerapi'
import Home from './containers/Home'
import Endpoints from './containers/Endpoints'
import Remotes from './containers/Remotes'
import NoMatch from './containers/NoMatch'

export default class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div id="app-container">
          <Router>
            <Route path="/" component={Powerapi}>
              <Route path="home" component={Home} />
              <Route path="endpoints" component={Endpoints} />
              <Route path="remotes" component={Remotes} />
              <Route path="*" component={NoMatch}/>
            </Route>
          </Router>
          <DevTools />
        </div>
      </Provider>
    )
  }
}
