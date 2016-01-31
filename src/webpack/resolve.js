import { resolveRoot } from '../config.server'
import { getAlias } from './alias'

export function getResolve(name) {
  return  { alias: getAlias(name)
          , fallback: resolveRoot('node_modules')
          , extensions: ['', '.jsx', '.js', '.json']
          }
}

export function getResolveLoader(name) {
  return  { root: resolveRoot('node_modules')
          , fallback: resolveRoot('node_modules')
          , extensions: ['', '.jsx', '.js', '.json']
          }
}
