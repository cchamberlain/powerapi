import express from 'express'
import path from 'path'
import { createServerLogger } from '../config.server'
import Renderer from './renderers/Renderer'
import bindAll from 'lodash.bindall'
import merge from 'lodash.merge'
import http from 'http'
import https from 'https'
import configureProxy from './proxy'
import configureApi from './api'
import configureRoutes from './routes'
import { readPfx } from './tls'
import { assert } from 'chai'
import { server as serverConfig } from '../config.server'

const logger = createServerLogger('Server')

function init({ config, paths }) {

}


export const startHttp = (instance, { port }) => {
  return new Promise((resolve, reject) => {
    http.createServer(instance).listen(port, err => err ? reject(err) : resolve(`STARTED @ http://:::${port}`))
  })
}
export const startHttps = (instance, { port }, opts) => {
  return new Promise((resolve, reject) => {
    https.createServer(opts, instance).listen(port, err => err ? reject(err) : resolve(`STARTED @ https://:::${port}`))
  })
}

export const isHttps = ({ scheme }) => scheme === 'https'

export const onFatal = err => {
  logger.fatal(err, 'A fatal error occurred starting the server.')
  setTimeout(() => process.exit(1), 4000)
}

export const startServer = (instance, binding, tls) => {
  assert.ok(binding, 'bindings must be specified')
  assert.typeOf(binding.port, 'number', 'binding port must be a valid port number')
  if(isHttps(binding)) {
    assert.ok(tls, 'tls options must be defined for https')
    const { pfxName, passphrase } = tls
    assert.typeOf(pfxName, 'string', 'pfxName must be a string filename')
    const resolvedPassphrase = process.env.PASSPHRASE || passphrase
    assert.typeOf(resolvedPassphrase, 'string', 'passphrase must be passed or set in environment variable PASSPHRASE')

    return readPfx(pfxName, resolvedPassphrase)
      .then(opts => {
        startHttps(instance, binding, opts)
          .then(message => logger.info({ binding }, message))
          .catch(err => onFatal(err))
      })
      .catch(err => onFatal(err))
  } else {
    return startHttp(instance, binding)
      .then(message => logger.info({ binding }, message))
      .catch(onFatal)
  }
}

export default class Server {
  static methods = ['route', 'use', 'get', 'start' ];
  constructor({ settings, locals }) {
    bindAll(this, Server.methods)
    this.instance = Object.assign(express(), { settings, locals })
    this.config = settings
    this.paths = locals
    this.middlewares = []
  }
  use(path, middleware) {
    if(arguments.length === 1)
      middleware = path
    if(path)
      this.instance.use(path, middleware)
    else
      this.instance.use(middleware)
  }
  get(...args) {
    this.instance.get(...args)
  }
  route() {
    configureApi(this)
    configureRoutes(this)
    configureProxy(this)
  }
  start() {
    this.instance.get('bindings').node.map(binding => {
      startServer(this.instance, binding, serverConfig.tls)
    })
  }
}
