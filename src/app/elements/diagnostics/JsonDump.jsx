import React from 'react'

export const JsonDump = props => {
  const { isHorizontal
        , children
        } = props
  let preStyle = { overflow: 'auto', wordWrap: 'normal', whiteSpace: 'pre', color: 'rgb(255, 255, 60)', backgroundColor: 'rgb(50, 0, 0)', fontSize: '0.7em' }
  const getInner = () => isHorizontal ? JSON.stringify(children, null, 2) : <code>{JSON.stringify(children, null, 2)}</code>
  return <pre style={preStyle}>{getInner()}</pre>
}
