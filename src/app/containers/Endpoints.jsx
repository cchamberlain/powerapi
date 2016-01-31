import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { EndpointForm } from 'elements/endpoints'

export default class Endpoints extends Component {
  render() {
    return <Row>
      <Col xs={12}>
        <EndpointForm endpoints={this.props.endpoints} />
      </Col>
    </Row>
  }
}

Endpoints.propTypes = { endpoints: React.PropTypes.array
                      }
