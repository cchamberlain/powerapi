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
  handleChange = e => {
    this.setState({url: e.target.value})
  }
  handleAdd = e => {
    let url = Endpoint.toUrl(this.state)
    if(this.state.endpoints.some(_ => Endpoint.toUrl(_) === url))
      return this.showError(`Endpoint ${url} already exists.`)
    this.setState({ endpoints: this.state.endpoints.concat([ Endpoint.toProps(this.state) ])
                  , scheme: this.props.scheme
                  , hostname: this.props.hostname
                  , port: this.props.port
                  , path: this.props.path
                  })
  }
  handleRemove = url => {
    this.setState({endpoints: this.state.endpoints.filter((_, i) => Endpoint.toUrl(_) !== url)})
  }
  showError = err => {
    this.setState({ alertText: err
                  , showAlert: true })
  }
  getEndpoints = () => this.state.endpoints.map((_, i) => (
      <Endpoint key={i}
        scheme={_.scheme}
        hostname={_.hostname}
        port={_.port}
        path={_.path}
        name={_.path.substring(1).replace(/\//g, '-') || 'root'}
        onRemove={this.handleRemove} />
    )
  )
  render() {
    return <Row>
        <SweetAlert
          show={this.state.showAlert}
          title="You messed up!"
          text={this.state.alertText}
          onConfirm={() => this.setState({ showAlert: false })} />
      <Col xs={12}>
        <Row>
          <Col xs={12}>
          <form className="form-inline">
            <div className="form-group form-group-sm">

            <span className="label label-default bg-base02 fg-blue">{`${this.state.scheme}:\/\/`}</span>
            {' '}
            <label className="sr-only" htmlFor="urlHostname">hostname</label>
            <input type="text" id="urlHostname" className="form-control"
                value={this.state.hostname}
                onChange={e => this.setState({hostname: e.target.value})}
                placeholder="hostname" />
            {' '}
            <span className="label label-default bg-base02 fg-blue">:</span>
            {' '}

            <label className="sr-only" htmlFor="urlPort">port</label>
            <input type="text" id="urlPort" className="form-control"
                value={this.state.port}
                onChange={e => this.setState({port: e.target.value})}
                placeholder="port" />

            {' '}
            <label className="sr-only" htmlFor="urlPath">path</label>
            <input type="text" id="urlPath" className="form-control"
                value={this.state.path}
                onChange={e => {
                  if(e.target.value.startsWith('/'))
                    this.setState({path: e.target.value})
                }}
                placeholder="path" />
            </div>
            <button className="btn btn-default btn-sm pull-right"
              onClick={this.handleAdd}>Add Endpoint</button>
          </form>
          </Col>
        </Row>
        <Row className="m-top-20">
          <Col xs={12}>
            {this.getEndpoints()}
          </Col>
        </Row>
      </Col>
    </Row>
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
                            , path: '/'
                            , endpoints: []
                            }


export class Endpoint extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name
    }
  }
  static toBaseUrl = x => `${x.scheme}:\/\/${x.hostname}:${x.port}`
  static toUrl = x => `${Endpoint.toBaseUrl(x)}${x.path}`
  static toProps = x => ({ scheme: x.scheme, hostname: x.hostname, port: x.port, path: x.path })
  render() {
    let url = Endpoint.toUrl(this.props)
    return <Row className="vertical-align">
      <Col xs={12}>

      <Row className="well well-sm">
      <label className="sr-only" htmlFor="endpointTitle">path</label>
      <div className="input-group input-group-lg">
        <span className="input-group-addon">endpoint</span>
        <input type="text" id="endpointName" className="form-control"
            placeholder="New Endpoint"
            value={this.state.name}
            onChange={e => this.setState({name: e.target.value})} />
        <span className="input-group-btn">
          <button className="btn btn-danger"
            onClick={() => this.props.onRemove(url)}>
              <i className="fa fa-trash-o fa-lg" />
          </button>
        </span>
      </div>
        <Row className="m-top-20">
        <Col xs={8}>
          <p><a href={url}>{url}</a></p>
        </Col>
        <Col xs={4}>
        </Col>
        </Row>
      </Row>

      </Col>

    </Row>
  }
}
Endpoint.propTypes =  { scheme: React.PropTypes.string
                      , hostname: React.PropTypes.string
                      , port: React.PropTypes.number
                      , path: React.PropTypes.string
                      , name: React.PropTypes.string.isRequired
                      , methods: React.PropTypes.array
                      }
