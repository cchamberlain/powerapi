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
    this.state =  { scheme: props.scheme
                  , hostname: props.hostname
                  , port: props.port
                  , path: props.path
                  , endpoints: props.endpoints
                  }
  }
  handleChange = (e) => {
    this.setState({url: e.target.value})
  }
  handleAdd(e) {
    let url = `${this.state.scheme}:\/\/${this.state.hostname}:${this.state.port}/${this.state.path}`
    console.log(url)
    if(validateUrl(url)) {
      this.setState({endpoints: this.state.endpoints.concat([url])})
    } else {
      this.setState({show: true})
    }
  }
  handleRemove = url => {
    this.setState({endpoints: this.state.endpoints.filter((_, i) => _ !== url)})
  }
  render() {
    return <Grid>
    <Row>
      <Col xs={12}>
        <Row>
        <form className="form-inline">
          {`${this.props.scheme}:\/\/ `}
          <div className="form-group">
            <label className="sr-only">hostname</label>
            <input type="text" id="urlHostname" className="form-control"
              value={this.state.hostname}
              onChange={e => this.setState({hostname: e.target.value})}
              placeholder="hostname" />
          </div>
          {' : '}
          <div className="form-group">
            <label className="sr-only">port</label>
            <input type="text" id="urlPort" className="form-control"
              value={this.state.port}
              onChange={e => this.setState({port: e.target.value})}
              placeholder="port" />
          </div>
          {' / '}
          <div xs={6} className="form-group">
            <label className="sr-only">path</label>
            <input type="text" id="urlPath" className="form-control"
              value={this.state.path}
              onChange={e => this.setState({path: e.target.value})}
              placeholder="path" />
          </div>
          <button className="btn btn-default pull-right" onClick={this.handleAdd}>Add Endpoint</button>
        </form>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <EndpointList endpoints={this.state.endpoints} handleRemove={this.handleRemove} />
      </Col>
    </Row>
    <SweetAlert
        show={this.state.show}
        title="Wrong!"
        text={`Does ${this.state.url} look like a url to you?`}
        onConfirm={() => this.setState({ show: false })} />
    </Grid>
  }
}
EndpointForm.propTypes =  { scheme: React.PropTypes.string
                          , hostname: React.PropTypes.string
                          , port: React.PropTypes.number
                          , path: React.PropTypes.string
                          , endpoints: React.PropTypes.array
                          }
EndpointForm.defaultProps = { scheme: 'http'
                            , hostname: 'localhost'
                            , port: 8080
                            , endpoints: []
                            }


export class EndpointList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { endpoints: props.endpoints }
  }
  render() {
    var endpointNodes = this.props.endpoints.map((endpoint, i) => {
      return <Endpoint key={i} url={endpoint} onRemove={this.props.handleRemove}></Endpoint>
    })
    return <div className="endpointList">
      {endpointNodes}
    </div>
  }
}
EndpointList.propTypes = { endpoints: React.PropTypes.array }

export class Endpoint extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let url = () => `${this.props.scheme}:\/\/${this.props.hostname}:${this.props.port}/${this.props.path}`
    return <Row>
        <Col xs={8}>
          <a href={url}>{url}</a>
        </Col>
        <Col xs={4}>
          <button className="btn btn-danger pull-right"
            onClick={() => this.props.onRemove(this.props.url)}>Remove</button>
        </Col>
      </Row>
  }
}
Endpoint.propTypes =  { scheme: React.PropTypes.string
                      , hostname: React.PropTypes.string
                      , port: React.PropTypes.number
                      , path: React.PropTypes.string
                      }
Endpoint.defaultProps = { scheme: 'http'
                        , hostname: 'localhost'
                        , port: 8080
                        }
