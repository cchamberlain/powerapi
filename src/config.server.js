import { resolve } from 'path'
import { createLogger } from 'bunyan'
import { client, baseUrl, createClientLogger } from './config.client'
import server from './config-server'

const noop = () => {}

const __rootname = __dirname
const resolveRoot = (...args) => resolve(__rootname, ...args)

const createServerLogger = name => createLogger({ name: name || server.log.name
                                                //, streams: server.log.streams || noop()
                                                , level: server.log.level || noop()
                                                })

export  { server, client, baseUrl, __rootname, resolveRoot, createServerLogger, createClientLogger }
