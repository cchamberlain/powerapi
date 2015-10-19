import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import SweetAlert from 'sweetalert-react'
import { chainLog } from 'helpers/logging'
import { validateUrl } from 'helpers/validators'
import 'sweetalert/dist/sweetalert.css'
import './endpoints.less'

export class EndpointForm extends React.Component {
  constructor(props) {
    super(props)
    this.state =  { endpoints: props.endpoints }
  }
  handleChange = e => this.setState({url: e.target.value})
  handleAdd = e => {
    if(validateUrl(this.state.url)) {
      console.log(this.state.endpoints)
      this.setState({endpoints: this.state.endpoints.concat([this.state.url])})
    } else {
      this.setState({show: true})
    }
  }
  render() {
    return <Grid>
    <Row>
      <Col xs={12}>
        <div className="input-group">
          <input type="text" className="form-control" value={this.state.url} onChange={this.handleChange} {...this.props} />
          <span className="input-group-btn">
            <button className="btn btn-default" onClick={this.handleAdd}>Add Endpoint</button>
          </span>
        </div>
      </Col>
    </Row>
    <Row>
      <EndpointList endpoints={this.state.endpoints} />
    </Row>
    <SweetAlert
        show={this.state.show}
        title="Wrong!"
        text={`Does ${this.state.url} look like a url to you?`}
        onConfirm={() => this.setState({ show: false })} />
    </Grid>
  }
}
EndpointForm.propTypes =  { url: React.PropTypes.string
                          , endpoints: React.PropTypes.array
                          }
EndpointForm.defaultProps = { placeholder:  "Add new endpoints here."
                            , url: ""
                            , endpoints: []
                            }

export class EndpointList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { endpoints: props.endpoints }
  }
  handleRemove = url => {
    this.setState({endpoints: this.state.endpoints.filter((_, i) => _ !== url)})
  }
  render() {
    let self = this
    var endpointNodes = this.props.endpoints.map((endpoint, i) => {
      return <Endpoint key={i} url={endpoint} onRemove={this.handleRemove}></Endpoint>
    })
    return <div className="endpointList">
      {endpointNodes}
    </div>
  }
}
EndpointList.propTypes = { endpoints: React.PropTypes.array }

export class Endpoint extends React.Component {
  constructor(props) {
    console.log(props)
    super(props)
  }
  handleRemove = e => {
    this.props.onRemove(this.props.url)
  }
  render() {
    return <Row>
        <Col xs={8}>
          <a href={this.props.url}>{this.props.url}</a>
        </Col>
        <Col xs={4}>
          <button className="btn btn-danger pull-right" onClick={this.handleRemove}>Remove</button>
        </Col>
      </Row>
  }
}
Endpoint.propTypes = { url: React.PropTypes.string }
