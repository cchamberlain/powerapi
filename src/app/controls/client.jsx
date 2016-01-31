import React, { Component, PropTypes } from 'react'
import Immutable from 'immutable'

import { connect } from 'react-redux'
import classNames from 'classnames'

import  { authorizeIdentity
        , refreshIdentity
        , impersonateIdentity
        , hydrateTokens
        , forgetTokens
        } from 'state/actions/identity'

import  { dismissError
        } from 'state/actions/api'

import { Grid, Well, Row, Col, Label } from 'react-bootstrap'
import { client, createClientLogger } from 'config'
import bindAll from 'lodash.bindall'
import DebugPanel from 'elements/panels/DebugPanel'
import AdminPanel from 'elements/panels/AdminPanel'
import TopBar from 'elements/nav/TopBar'
import FooterBar from 'elements/nav/FooterBar'


import Timeout from 'controls/Timeout'
import IdentityPanel from 'elements/panels/IdentityPanel'
import MaintenancePanel, { isResetRequest } from 'elements/panels/MaintenancePanel'
import ThemePanel from 'elements/panels/ThemePanel'
import ErrorPanel from 'elements/panels/ErrorPanel'

import contextTypes from 'app/context'
import getTheme from 'app/theme'
const defaultTheme = 'powerapi-dark'

const logger = createClientLogger('Client')
const devGridProps =  { xs: 12, xsOffset: 0
                      }

const prodGridProps = { xs: 12, xsOffset: 0
                      , sm: 10, smOffset: 1
                      , md: 8, mdOffset: 2
                      , lg: 4, lgOffset: 4
                      }

const gridProps = __DEV__ ? devGridProps : prodGridProps


/**
 * Client Module
 * This module exports React client application.
 * @module client
 */
class Client extends Component {
  static methods = ['renderBody', 'renderErrors'];
  static propTypes = { dispatch: PropTypes.func.isRequired };
  static childContextTypes = contextTypes;
  getChildContext() {
    return  { gridProps
            , theme: getTheme(this.props.visual.theme || defaultTheme)
            }
  }
  constructor(props) {
    super(props)
    bindAll(this, Client.methods)
  }
  componentDidMount() {
    const { dispatch, errors, identity } = this.props
    dispatch(hydrateTokens())
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
    /*
    return !(Immutable.is(this.props.api.entities, nextProps.api.entities)
            && Immutable.is(this.props.api.isFetching, nextProps.api.isFetching)
            && Immutable.is(this.props.api.errors, nextProps.api.errors)
            && this.props.identity.isAuthorized === nextProps.identity.isAuthorized)
*/
  }
  render(){
    const { identity, visual } = this.props
    const { style } = getTheme(visual.theme || defaultTheme)

    return (
      <div style={style.app}>
        <TopBar />
        {this.renderBody()}
        <FooterBar />
      </div>
    )
  }
  renderBody() {
    const { dispatch, identity, api, visual } = this.props
    const { style } = getTheme(visual.theme || defaultTheme)
    const { isAuthorized, isAdmin, isFetching, errors } = identity
    const { visibility } = visual

    return (
      <div style={style.body} className="body-content container">
        {isAdmin ? (
          <AdminPanel
              isLoading={isFetching}
              onRefresh={() => dispatch(refreshIdentity())}
          />
        ) : <div id="no-admin" />}

        {visibility.get('login-reset', 'login') === 'login' && !isResetRequest() ? (
          <IdentityPanel
              isAuthorized={isAuthorized}
              isLoading={isFetching}
              errors={errors.toArray()}
          />
        ) : (
          <MaintenancePanel
              isLoading={isFetching}
          />
        )}
        {visibility.get('theme-panel', false) ? <ThemePanel isLoading={isFetching} /> : null}
        {this.renderErrors()}
      </div>
    )
  }
  renderErrors() {
    const { dispatch, identity, api } = this.props

    let errorStyle =  {}//{ position: 'fixed', top: 70, width: '100%', textAlign: 'center' }
    let codeStyle = { padding: 3, maxHeight:100, fontSize: '0.7em' }
    let noTopStyle = { marginTop: 0, paddingTop: 0 }
    let headerStyle = { float: 'left', ...noTopStyle }
    let dismissStyle = { float: 'right', ...noTopStyle }
    let btnStyle = { paddingTop: 3, paddingBottom: 3 }
    let wellStyle = { padding: 8, paddingBottom:3, backgroundColor: '#666' }


    if(api.errors.size > 0) {
      return <ErrorPanel />
    }
  }

}

function mapStateToProps(state) {
  const { identity, api, visual, autocomplete } = state
  return  { identity
          , api
          , visual
          , autocomplete
          }
}

export default connect(mapStateToProps)(Client)
