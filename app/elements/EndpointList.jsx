import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Endpoint from './Endpoint'

export default class EndpointList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { endpoints: [] }
  }
  render() {
    var endpointNodes = this.props.endpoints.map((endpoint, i) => {
      return <Endpoint key={i} url={endpoint}></Endpoint>
    })
    return <div className="endpointList">
      {endpointNodes}
    </div>
  }
}
EndpointList.propTypes = { endpoints: React.PropTypes.array }



