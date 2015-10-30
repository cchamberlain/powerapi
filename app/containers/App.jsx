import React from 'react'
import { RouteHandler } from 'react-router'
import { Icon } from 'elements/fa'

import { Navbar } from 'elements/nav'
import './App.less'

import { Grid, Row, Col } from 'react-bootstrap'

let areas = { '/':  { icon: 'power-off'
                    , altIcon: { name: 'cog', spin: true }
                    , title: 'powerapi'
                    , subtext: 'RESTecution'
                    }
            , '/endpoints': { icon: 'bullseye'
                            , title: 'endpoints'
                            , subtext: 'listen and execute'
                            }
            , '/remotes' :  { icon: 'connectdevelop'
                            , title: 'remotes'
                            , subtext: 'control powerapi remotely'
                            }
            }
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  getCurrentArea = () => {
    let path = this.props.location.pathname.toLowerCase()
    let area = areas[path]
    return area || { icon: 'power-off', title: '404' }
  }
  render() {
    let area = this.getCurrentArea()
    return (<div>
      <Navbar areas={areas} />
      <Grid>
        <div className="page-header">
        <h1>
          <Icon icon={area.icon} size="lg" />
          {` ${area.title}`}
          <small className="pull-right">{area.subtext}</small>
        </h1>
      </div>
        <Row>
          <Col xs={12}>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    </div>)
  }
}
