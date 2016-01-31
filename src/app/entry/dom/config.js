import config from 'config-client'

export const injectConfigIntoDOM = () => {
  window.powerapi = window.powerapi || {}
  window.powerapi.config = window.powerapi.config || config
}
