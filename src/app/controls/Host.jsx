import { scheme, protocol, hostname, port, path } from 'services/location'
import { bindings } from 'config-client'
import bindAll from 'lodash.bindall'

const hostFormat = props => `${props.hostname}:${props.port}`
const urlFormat = props => `${props.protocol}//${props.host}/${props.path}`

const getBinding = name => {
  let binding = bindings[name]
  if(!binding)
    throw new Error(`No client binding exists for host ${name}.  Configure binding in bindings.<target> node of /client/etc/<config>.json.`)
  let schemeBinding = binding[scheme]
  if(!schemeBinding)
    throw new Error(`No client binding was configured for ${name} and the current scheme ${scheme} (of the web page).  Configure binding in bindings.<target> node of /client/etc/<config>.json.`)
  return schemeBinding
}

export default class Host {
  constructor({ name }) {
    this.binding = getBinding(name)

    bindAll(this, ['getUrl'])

    this.hostname = this.binding.hostname || hostname
    this.port = this.binding.port || port
    this.host = this.binding.host ? this.binding.host : hostFormat({ hostname: this.hostname, port: this.port})
    this.url = this.getUrl(path)
  }
  getUrl(path) {
    return urlFormat( { protocol: protocol
                      , host: this.host
                      , path: path
                      })
  }
}
