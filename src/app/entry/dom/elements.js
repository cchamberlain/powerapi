import { dom } from 'config-client'
import { createLogger } from 'bunyan'
import { createDOMElement, amendDOMElement } from 'services/dom'

const logger = createLogger({ name: 'dom/elements', level: 'debug' })

const buildDOMMap = elementMap => new Map(Object.keys(elementMap).map(element => [element, elementMap[element]]))

/** Maps element names to DOM ids. */
const idMap = dom.idMap ? buildDOMMap(dom.idMap) : new Map()

/** Maps other elements by name that should be disposed when this element is created. */
const disposalMap = dom.disposalMap ? buildDOMMap(dom.disposalMap) : new Map()

/** Maps container styles by name. */
const styleMap = dom.styleMap ? buildDOMMap(dom.styleMap) : new Map()

/** Maps styles that should be applied to body when element is loaded. */
const bodyStyleMap = dom.bodyStyleMap ? buildDOMMap(dom.bodyStyleMap) : new Map()

/** Maps innerHTML that should be injected into element. */
const innerHTMLMap = dom.innerHTMLMap ? buildDOMMap(dom.innerHTMLMap) : new Map()

const getOverridingElementSet = name => {
  let overridingSet = new Set()
  for(let [overrideName, overridesNames] of disposalMap) {
    if(overridesNames.includes(name))
      overridingSet.add(overrideName)
  }
  return overridingSet
}

/** Disposes earlier loaded elements that should no coexist with current loading element. */
const disposeOverriddenDOMElements = name => {
  let disposals = disposalMap.get(name)
  if(!Array.isArray(disposals)) /** Element has no disposals. */
    return
  disposals.forEach(disposeName => {
    let disposeElement = getElementFromGlobal(disposeName)
    if(!disposeElement || disposeElement.isDisposed) /** Element not in DOM, move on. */
      return
    if(typeof disposeElement.dispose !== 'function')
      throw new Error(`Disposable elements must implement a dispose function => disposeName === '${disposeName}'`)
    disposeElement.dispose(name)
  })
}

const appendDOM = (document, name) => {
  if(!(document && document.body && document.body.appendChild))
    throw new Error(`Unable to append ${name} to document body.`)
  if(!name)
    throw new Error('Element name is required.')
  let id = idMap.get(name)
  if(!id)
    throw new Error(`Mapped id is required for element => ${id}`)

  /** First dispose of any elements that should be removed. */
  disposeOverriddenDOMElements(name)

  let element = document.createElement('div')
  let dispose = (overrideName) => {
    document.body.removeChild(element)
    element.isDisposed = true
    logger.debug({ overrideName }, `Element '${name}' was disposed`)
  }

  let style = styleMap.get(name)
  let innerHTML = innerHTMLMap.get(name)
  let props = { id, style, innerHTML, dispose, isDisposed: false }
  amendDOMElement(element, props)

  let bodyStyle = bodyStyleMap.get(name)
  if(bodyStyle)
    amendDOMElement(document.body, { style: bodyStyle })

  document.body.appendChild(element)
  return element
}

export const injectElementIntoDOM = name => {
  window.powerapi = window.powerapi || {}

  try {
    /** If this element already exists in DOM, throw an error. */
    let element = window.powerapi[name]
    if(typeof element !== 'undefined')
      return Promise.reject(new Error(`Element already exists in DOM => ${name}`))

    /** If an overriding element already exists in DOM, cancel load. */
    let overriding = getOverridingElementSet(name)
    for(let overrideName of overriding) {
      if(typeof window[overrideName] !== 'undefined') {
        logger.warn(`Overriding element already exists on window, cancelling load of ${name} => overrideName === ${overrideName}`)
        return Promise.reject(new Error(`Overriding element already exists on window, cancelling load of ${name} => overrideName === ${overrideName}`))
      }
    }

    element = window.powerapi[name] = appendDOM(window.document, name)
    return Promise.resolve(element)
  } catch(err) {
    return Promise.resolve(err)
  }
}

export const getElementFromDOM = name => {
  let id = idMap.get(name)
  if(!id)
    throw new Error(`Element does not exist in DOM id map => ${name}`)
  let element = window.document.getElementById(id)
  if(!element)
    throw new Error(`Could not find dom element with id ${id}.`)
  return element
}

export const getElementFromGlobal = name => {
  if(!window.powerapi)
    throw new Error('window.powerapi is not defined.')
  return window.powerapi[name]
}
