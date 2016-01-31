import React, { Component, PropTypes } from 'react'
import { Navbar, Nav, NavbarBrand, NavItem, CollapsibleNav, Well, Grid, Row, Col, Label, Panel, Button, ButtonGroup } from 'react-bootstrap'
import bindAll from 'lodash.bindall'


const messageTypes = ['messages', 'validationMessages']
const messageLevels = ['info', 'warn', 'error']
const messageClasses = { messages: 'message', validationMessages: 'validate' }
const bgClasses = { info: 'green-bg', warn: 'yellow-bg', error: 'red-bg' }

export default class TopBar extends Component {
  static propTypes =  { messages: React.PropTypes.object
                      , validationMessages: React.PropTypes.object
                      , toggleMenu: React.PropTypes.func
                      };
  constructor(props) {
    super(props)
    this.state =  { hidden: { info: false
                            , warn: false
                            , error: false
                            }
                  }
    bindAll(this, ['renderBrand', 'hasMessages', 'getMessages', 'getMessagePanel'])
  }
  renderBrand() {
    return <NavbarBrand><img src="/img/logo-40.png" alt="Brand" /></NavbarBrand>
  }
  render() {
    let menuButton = this.props.menuEnabled ?  (<NavItem onClick={this.props.onToggleMenu} className="hamburger pull-left">
                                                  <span className="icon-bar"></span>
                                                  <span className="icon-bar"></span>
                                                  <span className="icon-bar"></span>
                                                </NavItem>) : null
    return (<div>
      <Navbar id="topbar" fixedTop inverse>
        <Nav>
          {menuButton}
          <NavItem className="pull-left" href="/management">{this.renderBrand()}</NavItem>
        </Nav>
        <Nav pullRight>
        </Nav>
      </Navbar>
      <Grid className="container">
        {this.getMessagePanel('error')}
        {this.getMessagePanel('warn')}
        {this.getMessagePanel('info')}
      </Grid>
    </div>)
  }
  hasMessages(type, level) {
    if(level)
      return (this.props[type] && this.props[type][level]) ? true : false
    return this.props[type] ? true : false
  }
  getMessages(type, level) {
    if(messageTypes.indexOf(type) === -1)
      throw new Error(`Unsupported message type: ${type}. Valid message types: ${messageTypes.join(',')}.`)
    if(messageLevels.indexOf(level) === -1)
      throw new Error(`Unsupported message level: ${level}. Valid message levels: ${messageLevels.join(',')}.`)

    if(!this.hasMessages(type, level))
      return null
    return this.props[type][level].map(message => <span className={`${messageClasses[type]} level-${type}`}>{message}</span>)
  }
  getMessagePanel(level) {
    if(!this.state.hidden[level] && !this.hasMessages('message', level) && !this.hasMessages('validationMessages', level))
      return null
    let hidePanel = () => {
      let hiddenState = this.state.hidden
      hiddenState[level] = true
      this.setState({ hidden: hiddenState })
    }
    return (<Col sm={12} className="messagePanel red-bg m-top-5">
        <Row>
          <Col md={12}>
            <i onClick={hidePanel} className="fa fa-times pull-right p-top-10" />
            <span>Not able to proceed, because of the following issues.</span><br />
            {getMessages(level)}
            {getValidationMessages(level)}
          </Col>
        </Row>
      </Col>)
  }

}
