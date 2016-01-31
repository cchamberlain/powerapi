import React from 'react'
import { Grid, Row, Col, ButtonGroup } from 'react-bootstrap'
import _ from 'lodash'

export class UrlAnalysis extends React.Component {
  constructor(props) {
    super(props)
  }
  isPortDefault = () => ((this.props.scheme === 'http' && this.props.port === 80) ||
                        (this.props.scheme === 'https' && this.props.port === 443));
  getHost = () => this.isPortDefault() ? this.props.hostname : `${this.props.hostname}:${this.props.port}`;
  render() {
    return <div>{this.props.scheme}{'://'}{this.getHost()}<PathAnalysis path={this.props.path} onSelectPart={this.props.onSelectPart} /></div>
  }
}
UrlAnalysis.propTypes = { scheme: React.PropTypes.string
                        , hostname: React.PropTypes.string
                        , port: React.PropTypes.number
                        , path: React.PropTypes.string
                        , onSelectPart: React.PropTypes.func
                        }

export class PathAnalysis extends React.Component {
  constructor(props) {
    super(props)
  }
  getParts = () => analyzePath(this.props.path);
  render() {
    let partInterior = part => {
      if(part.type === 'dynamic')
        return (<span>
          <span className="part part-accent">:</span>
          <span className={`part part-${part.type}`}>
            <button className="btn btn-success" onClick={() => this.props.onSelectPart(part)}>{part.name}</button>
          </span>
        </span>)
      return <span className={`part part-${part.type}`}>{part.name}</span>
    }
    return <span>
      {this.getParts().map((part, i) => <span key={i}>{'/'}{partInterior(part)}</span>)}
    </span>
  }
}
PathAnalysis.propTypes =  { path: React.PropTypes.string
                          , onSelectPart: React.PropTypes.func
                          }

export function analyzeUrl(url) {
  let parts = getUrlPartsArray(url)
  if(parts.length < 2) throw { message: `Url ${url} did not split into enough parts. Expected parts.length >= 2. Actual parts.length=${parts.length}` }
  let host = parts[1]
  return  { scheme: parts[0]
          , host: host
          //, hostname:
          }
}

export function analyzeBaseUrl(url) {
  let parts = getUrlPartsArray(url)
  let scheme = parts[0]
  let host = parts[1]
  //let path =
  let hostSplit = host.split(':')
  if(parts.length < 2) throw { message: `Url ${url} did not split into enough parts. Expected parts.length >= 2. Actual parts.length=${parts.length}` }
  return  { parts: parts
          , scheme: scheme
          , host: host
          , hostname: hostSplit.length > 1 ? hostSplit[0] : host
          , port: hostSplit.length > 1 ? hostSplit[1] : getDefaultPort(scheme)
          //, path:
          }

  return {
    host: host

  }
}

export function getDefaultPort(scheme) {
  switch(scheme) {
    case 'http':
      return 80
    case 'https':
      return 443
    case 'ftp':
      return 21
    default:
      throw { message: `Scheme [${scheme}] is not yet supported.`}
  }
}

export const getUrlPartsArray = url => url.replace(/:/, '').replace(/\/+/g, '/').split('/')

export function analyzePath(path) {
  return path.split('/').filter(part => part !== '').map((n, i) => {
    if(n.startsWith(':'))
      return { ordinal: i, literal: n, name: n.substring(1), type: 'dynamic' }
    return { ordinal: i, literal: n, name: n, type: 'static' }
  })
}
