import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { EndpointForm } from 'elements/endpoints'
import { chainLog } from 'helpers/logging'

export default class Endpoints extends React.Component {
  constructor(props) {
    super(props)
    this.state =  { endpoints: props.endpoints }
  }
  render() {
    return <Row>
      <Col xs={12}>
        <h3>Endpoints</h3>
        <EndpointForm endpoints={this.state.endpoints} />
      </Col>
    </Row>
  }
}

Endpoints.propTypes = { endpoints: React.PropTypes.array
                  }
