import { join } from 'path'
import favicon from 'serve-favicon'
import { createServerLogger, server as serverConfig } from '../config.server'
import { getCors } from './cors'

const logger = createServerLogger('routes')
const flags = serverConfig.flags
const cors = getCors()

/**
 * Routes Module
 * Exposes routes for the application.
 * @module server/lib/routes
 */

export default function (server) {
  const PUBLIC_ROOT = server.instance.locals.PUBLIC_ROOT
  const STATIC_ROOT = server.instance.locals.STATIC_ROOT

  logger.info({ PUBLIC_ROOT, STATIC_ROOT }, 'SERVING PATHS')
  let gzipExtensionFilter = /^(js|css|html|json|ico|eot|otf|ttf)$/

  let contentTypes =  { 'js': 'text/javascript'
                      , 'json': 'application/json'
                      , 'css': 'text/css'
                      , 'html': 'text/html'
                      , 'xml': 'text/xml'
                      , 'ico': 'image/x-icon'
                      , 'woff': 'application/x-font-woff'
                      , 'woff2': 'application/font-woff2'
                      , 'ttf': 'application/x-font-ttf'
                      , 'otf': 'application/x-font-otf'
                      , 'eot': 'application/vnd.ms-fontobject'
                      , 'svg': 'image/svg+xml'
                      , 'png': 'image/png'
                      , 'jpg': 'image/jpeg'
                      , 'jpeg': 'image/jpeg'
                      , 'gif': 'image/gif'
                      , 'tiff': 'image/tiff'
                      }
  const getDefaultHeaders = extension => {
    let contentType = contentTypes[extension]
    return contentType ? { 'Content-Type': contentType } : {}
  }

  logger.debug(`Serving files from ${PUBLIC_ROOT}`)

  server.use(favicon(join(STATIC_ROOT, 'favicon.ico')))
  server.get('/', serveStatic)
  server.get('/:assetType/:assetName', serveDynamic)
  server.get('/:assetType/:assetSubType/:assetName', serveDynamic)
  server.use((err, req, res, next) => {
    if (req.xhr) {
      logger.error(err, 'an unhandled web api error occurred')
      res.status(500).send({error: 'Error communicating with web API!'})
    } else {
      logger.error(err, 'an unhandled error occurred')
      next(err)
    }
  })

  function serveDynamic(req, res) {
    cors.handle(req, res)

    let assetType = req.params.assetType
    let assetSubType = req.params.assetSubType
    let assetName = req.params.assetName
    logger.debug(`SERVING STATIC ASSET => TYPE[${assetType}], NAME[${assetName}]`)
    if(!assetType || !assetName)
      throw new Error(`serveDynamic requires an assetType and assetName => assetType:[${assetType}], assetName:[${assetName}]`)
    switch(assetType) {
      case 'assets':
      case 'static':
      case 'img':
        let { path, headers } = serveResource({ assetType, assetSubType, assetName })
        res.sendFile(join(PUBLIC_ROOT, path), { headers })
        break;
      default:
        throw new Error(`serveDynamic does not support assetType ${assetType}`)
    }
  }

  function resolveAssetPath({ assetType, assetSubType }) {
    return assetSubType ? `${assetType}/${assetSubType}` : assetType
  }

  function serveResource({ assetType, assetSubType, assetName }) {
    let extension = assetName.slice((assetName.lastIndexOf('.') - 1 >>> 0) + 2)
    if(assetType === 'static' && !extension) {
      let path = `/static/html/${assetName}.html`
      let headers = getDefaultHeaders('html')
      logger.debug(`serving gzipped resource => path[${path}], headers[${JSON.stringify(headers)}]`)
      return { path, headers }
    } else {
      let assetPath = resolveAssetPath({ assetType, assetSubType })
      let headers = getDefaultHeaders(extension)
      if(flags.minify && gzipExtensionFilter.test(extension)) {
        let path = `/${assetPath}/gz/${assetName}`
        headers['Content-Encoding'] = 'gzip'
        logger.debug(`serving gzipped resource => path[${path}], headers[${JSON.stringify(headers)}]`)
        return { path, headers }
      } else {
        let path = `/${assetPath}/${assetName}`
        logger.debug(`serving resource => path[${path}], headers[${JSON.stringify(headers)}]`)
        return { path, headers }
      }
    }
  }

  let staticFilename = () => `${process.env.NODE_ENV === 'hot' ? 'hot' : 'index'}.html`
  let staticPath = join(STATIC_ROOT, 'html', staticFilename())
  function serveStatic(req, res) {
    cors.handle(req, res)
    logger.trace('serving static => %s', staticPath)
    res.sendFile(staticPath)
  }

  function servePartial(req, res) {
    var templatePath = join(__dirname, '..', '..', 'client', req.path);
    logger.trace('serving partial => %s', templatePath)
    res.sendFile(templatePath)
  }
}
