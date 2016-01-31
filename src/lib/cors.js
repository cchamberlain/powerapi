import { createServerLogger, server as serverConfig } from '../config.server'
const logger = createServerLogger('cors')

export function getCors() {
  let originPatterns = Array.isArray(serverConfig.cors.originPatterns) ? serverConfig.cors.originPatterns : [serverConfig.cors.originPatterns]
  originPatterns = originPatterns.map(pattern => {
    return new RegExp(pattern)
  })

  function isOk(req) {
    if(!req.headers.origin) {
      return true
    }
    return originPatterns.some(originTest)
    function originTest(pattern) {
      if(pattern.test(req.headers.origin)) {
        logger.trace('origin [%s] matches pattern [%s]', req.headers.origin, pattern)
        return true
      } else {
        return false
      }
    }
  }

  const originDoesNotMatch = origin => `Origin [${origin}] did not match acceptable patterns. Request has been rejected.`
  const originDoesNotExist = 'Origin did not exist. Request has been rejected.'

  const failureStatus = { code: 403
                        , message: '403 Forbidden'
                        }

  function getError(req) {
    return req.headers.origin ? { message: originDoesNotMatch(req.headers.origin)
                                , code: 10
                                }
                              : { message: originDoesNotExist
                                , code: 11
                                }

  }

  function getOptionsHeaders(req) {
    return  { 'Access-Control-Allow-Origin': req.headers.origin
            , 'Access-Control-Max-Age': 604800 // Specifies how long the preflight response can be cached in seconds
            , 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE'
            , 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            , 'Access-Control-Allow-Credentials': true
            }
  }

  function handle(req, res) {
    if(isOk(req)) {
      if(req.headers.origin) {
        logger.trace('proxy +origin [%s], method [%s]', req.headers.host, req.method)
      } else {
        logger.trace('proxy +host [%s], method [%s]', req.headers.host, req.method)
      }
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin || req.headers.host)
      res.setHeader('Access-Control-Allow-Credentials', true)
    } else {
      if(req.headers.origin) {
        logger.error('proxy -origin [%s], method [%s]', req.headers.host, req.method)
      } else {
        logger.warn('proxy -host [%s], method [%s]', req.headers.host, req.method)
      }
    }
  }

  function handlePreflight(req, res) {
    res.writeHead(200, getOptionsHeaders(req))
    res.end()
  }

  function handleFailure(req, res) {
    res.writeHead(failureStatus.code)
    res.end (JSON.stringify({ message: failureStatus.message
                            , errors: [ getError(req) ]
                            }))
  }

  return  { isOk : isOk
          , failureStatus: failureStatus
          , getError: getError
          , getOptionsHeaders: getOptionsHeaders
          , handle: handle
          , handlePreflight: handlePreflight
          , handleFailure: handleFailure
          }
}
