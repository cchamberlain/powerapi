import React from 'react'
import { RouteHandler } from 'react-router'

//import { stores } from '../stores'

import bootstrap from 'bootstrap-webpack'
import fontawesome from 'font-awesome-webpack'
import styles from './App.less'

import { Router, Route, Link } from 'react-router'
import { Grid, Row, Col } from 'react-bootstrap'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>App</h1>
            <ul>
              <li><Link to='/home'>Home</Link></li>
              <li><Link to='/setup'>Setup</Link></li>
            </ul>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    )
  }
}
