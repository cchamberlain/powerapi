import React, { Component, PropTypes } from 'react'
import ReactDOMServer from 'react-dom/server'
import JsonDump from './JsonDump'
import contextTypes from 'app/context'

export default class ErrorVisual extends Component {
  static contextTypes = contextTypes;

  render() {
    const { palette, color, brand, style } = this.context.theme
    let containerStyle =  { marginTop: 15
                          , marginBottom: 15
                          , padding: 10
                          , fontSize: '0.8em'
                          , color: palette.base02
                          , backgroundColor: color.primary
                          , borderRadius: 4
                          , borderStyle: 'solid'
                          , borderWidth: 1
                          , borderColor: palette.base1
                          }
    let dismissStyle =  { float:'right'
                        , backgroundColor: color.secondary
                        , borderRadius: 5
                        , borderWidth: 1
                        , borderColor: color.tertiary
                        , color: color.primary
                        , height: 28
                        , width: 28
                        }
    let errorReportStyle =  { backgroundColor: 'rgb(140, 100, 100)'
                            , borderColor: 'rgb(100, 80, 80)'
                            }
    let lowVerticalMargin = { marginTop:4, marginBottom: 4 }

    let { error, noReport, children, onDismiss } = this.props
    let { name, message, innerError, stack, input, init, apiName, actionName, inputData, response } = error

    let normalized =  { name: name || 'GenericError'
                      , message: typeof error === 'string' ? error : message || 'No message specified.'
                      , innerError: typeof innerError === 'string'  ? { name: 'MinimalError', message: innerError }
                                                                    : innerError
                      }

    const getReportLink = () => {
      const addresses = 'cole.chamberlain@gmail.com'
      const subject = encodeURIComponent('Application Error')
      let shortStack = stack ? stack.split('\n').filter((line, i) => i < 5).join('\r\n') : 'No Stack Available'
      let filteredProps = { name: name || 'GenericError'
                          , message: normalized.message
                          , innerError: normalized.innerError
                          }
      const body = encodeURIComponent(typeof err === 'string' ? `Error Report\r\n\r\n${message}` : `Error Report\r\n\r\n${JSON.stringify(filteredProps, null, 2)}\r\n\r\n${shortStack}`)
      const href = `mailto:${addresses}?subject=${subject}&body=${body}`
      return <div style={lowVerticalMargin}><a style={errorReportStyle} className="btn btn-default btn-sm" href={href}>Submit Error Report</a></div>
    }

    return (
      <div style={containerStyle}>
        <h4 style={lowVerticalMargin}>
          <i className="fa fa-exclamation-circle" /> An error has occurred!
          {onDismiss ? <button style={dismissStyle} onClick={onDismiss}><i className="fa fa-times" /></button> : null}
        </h4>
        <p style={lowVerticalMargin}>{normalized.name}: {normalized.message}</p>

        {apiName || actionName || response ? <DataVisual apiName={apiName} actionName={actionName} input={input} init={init} inputData={inputData} response={response} /> : null}

        <div style={lowVerticalMargin}>{children}</div>
        {stack ? <ErrorStackVisual style={lowVerticalMargin} stack={stack} /> : null}
        {normalized.innerError ? <div><h5>InnerError:</h5><ErrorVisual style={{marginTop:4, marginBottom:35}} error={normalized.innerError} noReport /></div> : null}
        {!noReport ? getReportLink() : null}
      </div>
    )
  }
}


export const IdentityErrorVisual = props => {
  return (
    <ErrorVisual>
      <TokensVisual tokens={props.tokens} />
      <FingerprintVisual fingerprint={props.fingerprint} />
    </ErrorVisual>
  )
}

export const TokensVisual = props => props.tokens ? (
  <div><AccessTokenVisual access={props.tokens.access} /><RefreshTokenVisual refresh={props.tokens.refresh} /></div>
) : null

export const AccessTokenVisual = props => props.access ? (
  <div>
    <h4>Token => {props.access}</h4>
    <div>Is Token Expired => {isTokenExpired(props.access)}</div>
    <div>Decoded Token =></div>
    <div><pre><code>{decodeToken(props.access)}</code></pre></div>
  </div>
) : null

export const RefreshTokenVisual = props => props.refresh ? (
  <div>{props.refresh}</div>
) : null

export const FingerprintVisual = props => props.fingerprint ? (
  <div>{props.fingerprint}</div>
) : null


export const DataVisual = props => {
  const { apiName, actionName, inputData, input, init, response } = props
  return (
    <div>
      <h5>Data Fetch Details</h5>
      {/*
      {apiName || actionName ? <span>API <i className="fa fa-long-arrow-right" /> data('{apiName || '???'}', '{actionName || '???'}'{inputData ? <span>{', <inputData>'}</span> : ''})</span> : null}

      {inputData ? <JsonDump json={inputData} isHorizontal={true} /> : null}

      {input || init || response ? <FetchResponseVisual input={input} init={init} url={response ? response.url : null} status={response ? response.status : null} ok={response ? response.ok : null} statusText={response ? response.statusText : null} /> : null}
    */}
    </div>
  )
}

export const FetchResponseVisual = props => {
  return (
    <ul>
      {props.input ? <li>input: {props.input}</li> : null}
      {props.init ? <li>init: <JsonDump json={props.init} isHorizontal={true} /></li> : null}
      {props.type ? <li>type: {props.type}</li> : null}
      {props.url ? <li>url: {props.url}</li> : null}
      {props.status ? <li>status: {props.status}</li> : null}
      {props.ok ? <li>ok: {props.ok}</li> : null}
      {props.statusText ? <li>statusText: {props.statusText}</li> : null}
    </ul>
  )
}

export const ErrorStackVisual = props => {
  let stackStyle =  { maxHeight: 150
                    , fontSize: '0.8em'
                    , backgroundColor: '#ccc'
                    }
  return (
    <div><pre style={stackStyle}><code>{props.stack}</code></pre></div>
  )
}
