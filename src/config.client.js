import { createLogger } from 'bunyan'
import client from './config-client'

const baseUrl = `http://${client.hostname}:${client.port}`

const fakeLogger = name => ({ name: `${name}-fake`,  trace: () => {}, debug: () => {}, info: () => {}, warn: () => {}, error: () => {}, fatal: () => {} })
const createClientLogger = name => __DEV__ ? createLogger({ name: name || client.log.name
                                                          , level: client.log.level || 'debug'
                                                          }) : fakeLogger(name)

export  { client, baseUrl, createClientLogger }
