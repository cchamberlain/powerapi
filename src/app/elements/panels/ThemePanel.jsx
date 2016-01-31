import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ColorPicker from 'react-color'

import { addToggle, toggleVisibility, setTheme } from 'state/actions/visual'

import contextTypes from 'app/context'
import  { themeNames
        } from 'app/theme'
import Label from 'elements/forms/controls/Label'

import CorePanel from './base/CorePanel'


class Swatch extends Component {
  static contextTypes = contextTypes;
  render() {
    const { base16, palette, showColorPicker, onClick, onColorPickerChanged, onColorPickerClosed } = this.props
    const backgroundColor = palette[base16]
    const swatchStyle = { margin: 2 }
    const textStyle = { fontSize: '0.8em' }
    const buttonStyle = { ...this.context.theme.style.input, width: 30, height: 20, backgroundColor, borderRadius: 4 }
    return (
      <div style={swatchStyle}>
        <div style={textStyle}>{base16}</div>
        <button style={buttonStyle} onClick={onClick} />
        <ColorPicker
          //color={palette[base16]}
          position="below"
          display={showColorPicker || false}
          onChange={onColorPickerChanged}
          onClose={onColorPickerClosed}
          type="sketch" />
      </div>
    )
  }
  componentDidMount() {
    this.props.addToggle(this.props.base16)
  }
}

class ThemePanel extends Component {
  static contextTypes = contextTypes;
  render() {
    const { dispatch, visual } = this.props
    const { theme } = this.context
    const { palette, color, style } = theme


    const ulStyle = { listStyleType: 'none', padding:0, margin: 0 }
    const liStyle = { width: 60, float: 'left', marginRight: 0, marginBottom: 20 }
    const liBtnStyle = { width: 100, float: 'left', marginRight: 10, marginBottom: 3 }
    const buttonStyle = { ...style.input, width: '100%', borderRadius: 4 }
    const wellStyle = { backgroundColor: palette.base3, borderColor: palette.base1, borderWidth: 1, borderStyle: 'solid', float: 'left', marginRight: 10 }

    const getSwatch = base16 => (
      <Swatch
          palette={palette}
          base16={base16}
          showColorPicker={visual.visibility.get(base16)}
          onClick={() => dispatch(toggleVisibility(base16))}
          addToggle={() => dispatch(name => addToggle(name, [false, true]))}
      />
    )
    return (
      <CorePanel
          title="Theme"
          iconName="paint-brush"
          iconLoadingName="cog"
          accent="green"
          isLoading={false}>


        <div className="well" style={wellStyle}>
          <h4>{theme.name}</h4>
          <ul style={ulStyle}>
            <li style={liStyle}>{getSwatch('base03')}</li>
            <li style={liStyle}>{getSwatch('base02')}</li>
            <li style={liStyle}>{getSwatch('base01')}</li>
            <li style={liStyle}>{getSwatch('base00')}</li>
            <li style={liStyle}>{getSwatch('base0')}</li>
            <li style={liStyle}>{getSwatch('base1')}</li>
            <li style={liStyle}>{getSwatch('base2')}</li>
            <li style={liStyle}>{getSwatch('base3')}</li>
          </ul>
          <ul style={{listStyleType: 'none', padding:0, margin: 0}}>
            <li style={liStyle}>{getSwatch('yellow')}</li>
            <li style={liStyle}>{getSwatch('orange')}</li>
            <li style={liStyle}>{getSwatch('red')}</li>
            <li style={liStyle}>{getSwatch('magenta')}</li>
            <li style={liStyle}>{getSwatch('violet')}</li>
            <li style={liStyle}>{getSwatch('blue')}</li>
            <li style={liStyle}>{getSwatch('cyan')}</li>
            <li style={liStyle}>{getSwatch('green')}</li>
          </ul>
        </div>

        <div className="well" style={wellStyle}>
          <h4>Schemes</h4>
          <ul style={{listStyleType: 'none', padding:0, margin: 0}}>
            {themeNames.map((name, i) => (
              <li key={i} style={liBtnStyle}>
                <button style={buttonStyle} onClick={() => dispatch(setTheme(name))}>{name}</button>
              </li>
            ))}
          </ul>
        </div>
      </CorePanel>
    )
  }
}

class ThemeSelectorElement extends Component {
  render() {
    const { dispatch } = this.props
    return (
      <Label onClick={() => dispatch(toggleVisibility('theme-panel'))}>Theme</Label>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { identity, api, visual } = state
  return  { identity
          , api
          , visual
          , ...ownProps
          }
}

export default connect(mapStateToProps)(ThemePanel)
export const ThemeSelector = connect(mapStateToProps)(ThemeSelectorElement)
