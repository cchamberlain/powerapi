import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { EndpointForm } from 'elements/endpoints'
import { chainLog } from 'helpers/logging'

export default class Setup extends React.Component {
  constructor(props) {
    super(props)
    this.state =  { endpoints: props.endpoints }
  }
  render() {
    return <Row>
      <Col xs={12}>
        <h3>Setup - Register endpoints to listen for events</h3>
        <p>Endpoints - This is some more code</p>
        <EndpointForm endpoints={this.state.endpoints} />
      </Col>
    </Row>
  }
}

Setup.propTypes = { endpoints: React.PropTypes.array
                  }
Setup.defaultProps =  { endpoints:  [ "http://localhost:1337/deploy" ]
                      }
