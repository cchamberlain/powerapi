import { server } from '../config.server'

export function getDevTool(name) {
  return 'eval'
  /*
  if(name === 'shim' || name === 'static') // TODO: FIGURE OUT WHY SOURCE MAP BREAKS IE8
    return 'inline-source-map'
  return server.flags.dev ? 'cheap-module-eval-source-map' : 'source-map'
  */
}
