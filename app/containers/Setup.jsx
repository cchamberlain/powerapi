import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import EndpointList from 'elements/EndpointList'

export default class Setup extends React.Component {
  constructor(props) {
    super(props)
    this.state = { endpoints: props.endpoints }
  }
  render() {
    return <div>
    <Row>
      <Col xs={12}>
        <h3>Setup - Register endpoints to listen for events</h3>
        <p>Endpoints</p>
        <EndpointList endpoints={this.props.endpoints}></EndpointList>
      </Col>
    </Row>
    </div>
  }
}

Setup.propTypes = { endpoints: React.PropTypes.array }
Setup.defaultProps =  { endpoints:  [ "//localhost:1337/deploy" ]
                      }
