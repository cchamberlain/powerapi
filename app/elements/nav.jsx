import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'
import { ListIconLink, IconLink, Icon } from './fa'
import './nav.less'

function* entries(obj) {
  for(let key of Object.keys(obj)) {
    yield [key, obj[key]]
  }
}
export class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let getLink = (path, area) => <IconLink to={path} icon={area.icon} size={area.size} title={area.title} />

    let getNavLinks = areas => {
      let navLinks = []
      for(let [path, area] of entries(areas)) {
        if(path === '/') continue
        navLinks.push(<ListIconLink key={path} to={path} icon={area.icon} size={area.size} title={area.title} />)
      }
      return navLinks;
    }

    return (<nav className="navbar navbar-solarized navbar-fixed-top bg-base02">
    <div className="container">
      <div className="navbar-header">
        <div className="navbar-brand">
          {getLink('/', this.props.areas['/'])}
        </div>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          {getNavLinks(this.props.areas)}
        </ul>
      </div>
    </div>
  </nav>)
  }
}
Navbar.propTypes =  { areas: React.PropTypes.object.isRequired }
