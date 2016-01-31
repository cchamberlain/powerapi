import React, { Component, PropTypes } from 'react'
import { RouteHandler } from 'react-router'
import { connect } from 'react-redux'
import { client, createClientLogger } from 'config'

import FA from 'elements/visual/FA'

import Navbar from 'elements/Navbar'

import IdentityPanel from 'elements/panels/IdentityPanel'
import MaintenancePanel, { isResetRequest } from 'elements/panels/MaintenancePanel'
import ThemePanel from 'elements/panels/ThemePanel'
import ErrorPanel from 'elements/panels/ErrorPanel'

import contextTypes from 'app/context'
import getTheme from 'app/theme'
const defaultTheme = 'solarized-dark'

const logger = createClientLogger('Client')
const devGridProps =  { xs: 12, xsOffset: 0
                      }

const prodGridProps = { xs: 12, xsOffset: 0
                      , sm: 10, smOffset: 1
                      , md: 8, mdOffset: 2
                      , lg: 4, lgOffset: 4
                      }

const gridProps = __DEV__ ? devGridProps : prodGridProps



let areas = { '/':  { icon: 'power-off'
                    , altIcon: { name: 'cog', spin: true }
                    , title: 'powerapi'
                    , subtext: 'home'
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
class Powerapi extends Component {
  static childContextTypes = contextTypes;
  getChildContext() {
    return  { gridProps
            , theme: getTheme(this.props.visual.theme || defaultTheme)
            }
  }
  render() {
    const { identity, visual, location, children } = this.props
    const { style } = getTheme(visual.theme || defaultTheme)
    let area = areas[location.pathname.toLowerCase()] || { icon: 'power-off', title: '404' }

    return (
      <div style={style.app}>
        <Navbar areas={areas} />
          <div className="page-header">
          <h1>
            <FA icon={area.icon} size="lg" />
            {` ${area.title}`}
            <small className="pull-right">{area.subtext}</small>
          </h1>
        </div>
        <div>
          <div xs={12}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return  { visual: state.get('visual')
          , autocomplete: state.get('autocomplete')
          }
}

export default connect(mapStateToProps)(Powerapi)
