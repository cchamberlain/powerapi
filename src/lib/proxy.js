/***
 * Proxy Module
 * Responsible for reading proxy config and setting up proxies.
 * @module server/proxy
 */
import httpProxy from 'http-proxy'
import { createServerLogger } from '../config.server'
import { readPfx } from './tls'
import { getCors } from './cors'
import { server as serverConfig } from '../config.server'

const logger = createServerLogger('proxy')
const proxyListen = ({ name, fromPort, toHost, toPort }) => `proxy ${name} directing from :${fromPort} to ${toHost}:${toPort}`

export default function configureProxies (server) {
  var proxies = server.instance.get('proxies')
    , bindings = server.instance.get('bindings')
    , schemes = bindings.node.map(x => x.scheme)
    , http = require('http')
    , https = require('https')
    , hasHttp = schemes.some(s => s === 'http')
    , hasHttps = schemes.some(s => s === 'https')
    , cors = getCors()

  /*** Iterate proxy configs and start routing */
  if(!proxies)
    return
  proxies.forEach(setupProxy)

  function setupProxy(config) {
    console.log('PROXY CONFIG', JSON.stringify(config))
    let options = getProxyOptions(config)
      , proxy = httpProxy.createProxyServer(options)
      , listenMessage = proxyListen(config)

    proxy.on('error', (err, req, res) => {
      logger.error(err, 'error proxying request')
      res.end()
    })

    proxy.on('proxyReq', (proxyReq, req, res, options) => {
      // This event fires on proxy requests
      /* TODO: ADD ABILITY TO SEND HEADERS BACK IN (TEST)
      if(config.headers) {
        for (var i = 0; i < config.headers.length; i++) {
          var proxyHeader = config.headers[i]
          res.setHeader(proxyHeader.name, proxyHeader.value)
        }
      }
      */
    })

    proxy.on('proxyRes', (proxyRes, req, res) => {
      cors.handle(req, res)
    })

    if(config.fromScheme === 'http') {
      logger.debug('starting http proxy...')
      createProxyServer(http.createServer(onProxy))
    } else if(config.fromScheme === 'https') {
      logger.debug('starting https proxy...')
      const { pfxName, passphrase } = serverConfig.tls
      readPfx(pfxName, process.env.PASSPHRASE || passphrase)
        .then(opts => createProxyServer(https.createServer(opts, onProxy)))
        .catch(err => {
          logger.error(err, 'an error occurred reading tls information')
          process.exit(1)
        })
    }


    function createProxyServer(proxyServer) {
      if (config.allowWebSockets) {
        proxyServer.on('upgrade', function (req, socket, head) {
          proxy.ws(req, socket, head)
        })
      }
      proxyServer.listen(config.fromPort, function () { logger.info(listenMessage) })
    }

    function onProxy(req, res) {
      if(cors.isOk(req)) {
        if(config.stub && config.stub[req.method]) {
          proxyStub(req, res)
        } else {
          if(req.method === 'OPTIONS') {
            cors.handlePreflight(req, res)
          } else {
            proxyWeb(req, res)
          }
        }
      } else {
        cors.handleFailure(req, res)
      }
    }

    function proxyWeb(req, res) {
      if (config.latency) {
        setTimeout(function () {
          proxy.web(req, res)
        }, config.latency)
      } else {
        proxy.web(req, res)
      }
    }

    function proxyStub(req, res) {
      var stub = config.stub[req.method]
      res.writeHead(200, stub.headers)
      if (stub.headers['content-length'] === 0) res.end()
      else res.end(JSON.stringify(stub.body))
    }
  }
}

function getProxyOptions(config) {
  var opts =  { target: config.toScheme + '://' + config.toHost + ':' + config.toPort
              , xfwd: true
              }
  if(config.fromScheme === 'https') {
    opts.secure = true
  }
  return opts
}
