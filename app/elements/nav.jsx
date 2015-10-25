import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'
import './nav.less'

export class Navbar extends React.Component {
  render = () => (<nav className="navbar navbar-default navbar-fixed-top bg-base02">
    <div className="container">
      <div className="navbar-header">
        <Link className="navbar-brand" to='/home'>
          <i className="fa fa-power-off fa-lg fg-blue" ></i>
          <span className="fg-blue">powerapi</span>
          </Link>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li><Link to='/endpoints'>endpoints</Link></li>
          <li><Link to='/remotes'>remotes</Link></li>
        </ul>
      </div>
    </div>
  </nav>)
}
