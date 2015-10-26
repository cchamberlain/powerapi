import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'
import { FAIcon } from './fa'
import './nav.less'

function* entries(obj) {
  for(let key of Object.keys(obj)) {
    yield [key, obj[key]]
  }
}
export class Navbar extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.areas)
  }
  getFALink = x => (<Link to={x.to} {...x}>
                              <FAIcon icon={x.icon} size={x.size} />
                              {` ${x.title}`}
                           </Link>)

  render = () => {
    let navLinks = []
    for(let [path, area] of entries(this.props.areas)) {
      navLinks.push(<li>{this.getFALink({to: path, ...area})}</li>)
    }

    let primaryArea = this.props.areas['/']
    primaryArea.className='navbar-brand'


    return (<nav className="navbar navbar-solarized navbar-fixed-top bg-base02">
    <div className="container">
      <div className="navbar-header">
        {getFALink(primaryArea)}
        {/*
        <Link className="navbar-brand" to='/home'>
          <i className="fa fa-power-off fa-lg fg-blue" />
          <span className="fg-blue">powerapi</span>
        </Link>
      */}
      </div>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          {navLinks}
          {/*
          <li>
            <Link to='/endpoints'>
              <i className="fa fa-bullseye fa-lg" />
              {' endpoints'}
            </Link>
          </li>
          <li>
            <Link to='/remotes'>
              <i className="fa fa-connectdevelop fa-lg" />
              {' remotes'}
            </Link>
          </li>
        */}
        </ul>
      </div>
    </div>
  </nav>)
  }
}
//Navbar.propTypes = { areas: React.PropTypes.array }
