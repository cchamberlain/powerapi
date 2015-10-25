import React from 'react'
import { RouteHandler } from 'react-router'

//import { stores } from '../stores'

import bootstrap from 'bootstrap-webpack'
import fontawesome from 'font-awesome-webpack'
import { Navbar } from 'elements/nav'
import './colors.less'
import './App.less'

import { Grid, Row, Col } from 'react-bootstrap'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (<div>
      <Navbar />
      <Grid>
        <Row>
          <Col xs={12}>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    </div>)
  }
}
