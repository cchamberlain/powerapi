import path from 'path'
import { createLogger } from 'bunyan'

export const packageName = 'powerapi'
export const packageKey = 'powerapi'
export const defaultThemeName = 'solarized-dark'
export const faviconUrl = '/images/nintendo.ico'
export const faviconPath = path.join(__dirname, 'public/images/nintendo.ico')

export const noop = () => {}
export const IS_HOT = process.env.NODE_ENV === 'hot'
export const IS_DEV = process.env.NODE_ENV !== 'production'
export const IS_BROWSER = typeof window === 'object'

export const client = require('./config-client.json')
export const server = IS_BROWSER ? noop() : require('./config-server.json')
const configJSON = IS_BROWSER ? client : server
export const packageJSON = require('./package.json')

export const baseUrl = `http${client.environment === 'debug' ? '' : 's'}://${client.hostname}:${client.port}`

const level = (configJSON.log || { level: 'debug' }).level || 'debug'
export const log = (!IS_DEV && IS_BROWSER
  ? ({ name: packageName, trace: noop, debug: noop, info: noop, warn: noop, error: noop, fatal: noop })
  : createLogger({ name: packageName, level, streams: [] }))

export const __rootname = IS_BROWSER ? '/' : __dirname
export const resolveRoot = (...args) => IS_BROWSER ? `${__rootname}${args.join('/')}` : path.resolve(__rootname, ...args)

const { dependencies = {}, devDependencies = {}, peerDependencies = {}, optionalDependencies = {} } = packageJSON
export const dependencyNames = IS_BROWSER ? noop() : Array.from(new Set([ ...Object.keys(dependencies)
                                                                        , ...Object.keys(devDependencies)
                                                                        , ...Object.keys(peerDependencies)
                                                                        , ...Object.keys(optionalDependencies)
                                                                        ]))


