import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col, Well } from 'react-bootstrap'
import classNames from 'classnames'
import contextTypes from 'app/context'
import NoShim from 'elements/filters/NoShim'
import FA, { faSizeOptions, faDefaultProps } from 'elements/visual/FA'

export const panelPropTypes = { children: PropTypes.any.isRequired
                              , title: PropTypes.string.isRequired
                              /** BASE 16 NAME (CONTEXT) OR RESOLVES TO NORMAL COLOR STYLE */
                              , accent: PropTypes.string
                              , iconName: PropTypes.string.isRequired
                              , iconLoadingName: PropTypes.oneOf(['same', 'spinner', 'circle-o-notch', 'refresh', 'cog', 'spinner'])
                              , iconSpinnerName: PropTypes.oneOf(['spin', 'pulse'])
                              , iconSize: PropTypes.oneOf(faSizeOptions)
                              , isLoading: PropTypes.bool
                              , headerStyle: PropTypes.object
                              , contentStyle: PropTypes.object
                              }

export const panelDefaultProps =  { iconName: 'circle-o-notch'
                                  , iconLoadingName: 'same'
                                  , iconSize: 'lg'
                                  , isLoading: false
                                  , headerStyle: {}
                                  , contentStyle: {}
                                  }


class CorePanel extends Component {
  static propTypes = panelPropTypes;
  static defaultProps = panelDefaultProps;
  static contextTypes = contextTypes;
  render() {
    const { children
          , title
          , iconName
          , iconLoadingName
          , iconSize
          , isLoading
          , headerStyle
          , contentStyle
          , accent
          } = this.props

    const { theme: { palette, color, style }, gridProps } = this.context

    const accentColor = accent ? palette[accent] : color.accent

    const containerStyle =  { display: 'flex'
                            , flexDirection: 'column'
                            }

    const headerDefaultStyle = { padding: 10 }
    const contentDefaultStyle = { padding: 10, marginBottom: 10, paddingTop: 0, marginTop:0 }
    const titleDefaultStyle = { paddingTop:0, paddingBottom:0, marginTop:10, ...style.bold }
    const iconStyle = { marginTop:10 }

    return (
      <Row style={style.panel}>
        <Col {...gridProps} style={containerStyle}>
          <div style={{ ...headerDefaultStyle, ...headerStyle }}>
            <h2 className="pull-left" style={titleDefaultStyle}>{title}</h2>
            <div className="pull-right" style={iconStyle}>
              <NoShim><FA name={iconName} loadingName={iconLoadingName} size={iconSize} color={accentColor} isLoading={isLoading} /></NoShim>
            </div>
          </div>
          <div style={{ ...contentDefaultStyle, ...contentStyle }}>
            {children}
          </div>
        </Col>
      </Row>
    )
  }
}
export default CorePanel
