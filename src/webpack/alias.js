import { resolveRoot } from '../config.server'
import { resolve } from 'path'

export const configClientPath = resolveRoot('./config-client.js')
export const configServerPath = resolveRoot('./config-server.js')
export const configPath = resolveRoot('./config.client.js')

export const libFolder = resolveRoot('./src/lib')
export const appFolder = resolveRoot('./src/app')
export const binFolder = resolveRoot('./src/bin')

export const controlsFolder = resolve(appFolder, 'controls')
export const elementsFolder = resolve(appFolder, 'elements')
export const stateFolder = resolve(appFolder, 'state')
export const servicesFolder = resolve(appFolder, 'services')
export const stylesFolder = resolve(appFolder, 'styles')
export const imagesFolder = resolve(appFolder, 'images')

export function getAlias(name) {
  return  { 'config-client': configClientPath
          , 'config': configPath
          , 'app': appFolder
          , 'chai': 'assertive-chai'
          , 'controls': controlsFolder
          , 'elements': elementsFolder
          , 'services': servicesFolder
          , 'state': stateFolder
          , 'styles': stylesFolder
          , 'images': imagesFolder
          }
}
