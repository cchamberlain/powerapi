export const domSet = new Set(['div', 'style'])

/** Safely merges props to a DOM element recursively. Mutates the DOM element (reference) and returns mutated as convenience. */
export const amendDOMElement = (element, props) => {
  Object.keys(props).filter(propName => typeof props[propName] !== 'undefined')
    .forEach(propName => {
      /** If any property is a DOM element, go recursive on it. */
      if(domSet.has(propName))
        return amendDOMElement(element[propName], props[propName])
      element[propName] = props[propName]
    })
  return element
}

export const createDOMElement = (domName, props) => amendDOMElement(window.document.createElement(domName), props)

/** Import a script into the file via promise. */
export const importScript = src => {
  return new Promise((resolve, reject) => {
    let r = false
    const onload = () => {
      let readyState = this.readyState
      if(!r && (!readyState || readyState === 'complete'))
        return Promise.resolve({ readyState })
    }
    let s = createDOMElement('script',  { type: 'text/javascript'
                                        , src
                                        , onload
                                        , onreadystatechange: onload
                                        })
    let t = window.document.getElementsByTagName('script')[0]
    t.parentNode.insertBefore(s, t)
  })
}
