import React, { Component, PropTypes } from 'react'
import { Navbar, Nav, NavBrand, NavItem, CollapsibleNav, Well, Grid, Row, Col, Panel, Button, ButtonGroup } from 'react-bootstrap'
import Label from 'elements/forms/controls/Label'
import bindAll from 'lodash.bindall'
import classNames from 'classnames'
import Identity from 'controls/Identity'

import FA from 'elements/visual/FA'

import contextTypes from 'app/context'

export const detectAttributes = () => {
  let attributes = []
  if(__DEV__) {
    attributes.push({ title: 'DEV', icon: 'code', bsStyle: 'info' })
  }
  if(__HOT__) {
    attributes.push({ title: 'HOT', icon: 'fire', bsStyle: 'danger' })
  }
  if(__SHIM__) {
    attributes.push({ title: 'SHIM', icon: 'internet-explorer', bsStyle: 'warning' })
  }
  return attributes
}

const attributeShape =  { title: PropTypes.string.isRequired
                        , icon: PropTypes.string
                        , bsStyle: PropTypes.oneOf(['success', 'warning', 'danger', 'info', 'default', 'primary', 'link'])
                        }

export default class FooterBar extends Component {
  static propTypes =  { showCopyright: PropTypes.bool.isRequired
                      , showTerms: PropTypes.bool.isRequired
                      , showAttributes: PropTypes.bool.isRequired
                      , attributes: PropTypes.arrayOf(PropTypes.shape(attributeShape))
                      , errors: PropTypes.array
                      };
  static defaultProps = { showCopyright: true
                        , showTerms: true
                        , showAttributes: __DEV__
                        , attributes: detectAttributes()
                        };
  static contextTypes = contextTypes;
  constructor(props) {
    super(props)
    bindAll(this, ['renderCopyright', 'renderTerms', 'renderAttributes'])
  }
  render() {
    return <div id="FooterBar">
      <Row>
        <Col className="FooterBarLeft" xs={6}>
          {this.props.showAttributes ? this.renderAttributes() : null}
        </Col>
        <Col className="FooterBarRight" xs={6}>
          {this.props.showTerms ? this.renderTerms() : null}
        </Col>
      </Row>
      <Row>
        <Col className="FooterBarLeft" xs={6}>
          <Identity />
        </Col>
        <Col className="FooterBarRight" xs={6}>
          {this.props.showCopyright ? this.renderCopyright() : null}
        </Col>
      </Row>
    </div>
  }
  renderCopyright() {
    return <Label>Tix, Inc. 2001-{new Date().getFullYear()} <i className="fa fa-copyright" /><span className="hidden-xs"> All Rights Reserved</span></Label>
  }
  renderTerms() {
    return (<span>
      <Label><a href="/privacy.asp" target="_self">Privacy Policy</a></Label>
      {' '}
      <Label><a href="/termsofuse.asp" target="_self">Terms of Use</a></Label>
    </span>)
  }
  renderAttributes() {
    const { style, brand } = this.context.theme
    return this.props.attributes.map((x, i) => (
      <Label key={i} iconName={x.icon} bsStyle={x.bsStyle}>
        {x.title}
      </Label>
      /*
      <Label key={i} style={{ ...style.label, backgroundColor: brand[x.bsStyle || 'default']}}>
        <FA name={x.icon} color={style.label.color} /> {x.title}
      </Label>
    */
    ))
  }
}


