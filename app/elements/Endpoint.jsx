import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

export default class Endpoint extends React.Component {
  constructor(props) {
    super(props)
    this.state =  { url: props.url }
  }
  render() {
    return <a href={this.props.url}>{this.props.url}</a>
  }
}

Endpoint.propTypes = { url: React.PropTypes.string }
