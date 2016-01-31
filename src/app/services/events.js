/**
 * Events
 * addEventListener / removeEventListener polyfill to support all browsers.
 *
 * @author Cole Chamberlain (upgraded from http://www.dustindiaz.com/rock-solid-addevent/)
 * @module events.js
 *
 */

 import DOMError from 'app/errors/DOMError'

export const interceptDOMErrors = (onError, suppress = false) => {
  window.onerror = function(message, fileName, lineNumber, col, error) {
    // Note that col & error are new to the HTML 5 spec and may not be
    // supported in every browser.  It worked for me in Chrome.
    if(!error)
      error = new Error(message, fileName, lineNumber, col)

    onError(new DOMError('An error occurred on the DOM window.', error, { fileName, lineNumber, col }))
    return suppress
  }
}

export const addDOMEvent = (obj, type, fn, useCapture = false) => {
  if (obj.addEventListener) {
    obj.addEventListener(type, fn, useCapture)
  } else if (obj.attachEvent) {
    obj[`e${type}${fn}`] = fn
    obj[type+fn] = () => { obj[`e${type}${fn}`](window.event) }
    obj.attachEvent(`on${type}`, obj[type+fn])
  } else {
    obj['on'+type] = obj['e'+type+fn]
  }
}

export const removeDOMEvent = (obj, type, fn, useCapture = false) => {
  if(obj.removeEventListener)
    obj.removeEventListener(type, fn, useCapture)
  if(type.substring(0, 2) !== 'on'){
    type = `on${type}`
  }
  if(obj.detachEvent){
    obj.detachEvent(type, fn)
  }
  if(obj[type])
    obj[type] = null
}
