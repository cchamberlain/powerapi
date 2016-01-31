import { loadScript } from 'services/dom'

export const injectFNIntoDOM = () => {
  window.powerapi = window.powerapi || {}
  window.powerapi.fn = window.powerapi.fn || {  }
}
