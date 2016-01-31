import { diagnose } from 'services/diagnostics'

export const injectWTFIntoDOM = () => {
  window.powerapi = window.powerapi || {}
  let diagnostics = { get wtf() { return diagnose() } }
  Object.assign(window.powerapi, diagnostics)
}
