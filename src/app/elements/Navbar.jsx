import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import FA from 'elements/visual/FA'

/**
 * Navbar
 * @flow
 */

const Navbar = props => {
  const { dispatch, areas } = props
  let getLink = (path, area, key) => <button key={key} onClick={() => dispatch(routeActions.push(path))}><FA icon={area.icon} size={area.size} /> {area.title}</button>

  let getNavLinks = () => {
    return Object.keys(areas).map((path, key) => {
      const area = areas[path]
      return getLink(path, area, key)
    })
  }

  return (
    <nav className="navbar navbar-solarized navbar-fixed-top bg-base02">
      <div className="container">
        <div className="navbar-header">
          <div className="navbar-brand">
            {getLink('/', areas['/'])}
          </div>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            {getNavLinks()}
          </ul>
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = { areas: PropTypes.object.isRequired }

function mapStateToProps(state) {
  const { identity, visual, autocomplete } = state
  return  { identity
          , visual
          , autocomplete
          }
}

export default connect(mapStateToProps)(Navbar)
