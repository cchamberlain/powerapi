//import restify from "restify"
import express from 'express'
import path from "path"
import Renderer from "./renderers/Renderer"
import prerenderApi from "./api/prerender"


export default class Server {
  constructor(options) {
    this.props = options
    this.props.middlewares = []
  }
  use(middleware) {
    this.props.middlewares.push(middleware)
  }
  start() {
    //let server = restify.createServer()
    let server = express()
    /*
    server.pre(restify.pre.userAgentConnection())
    server.use(restify.acceptParser(server.acceptable))
    server.use(restify.authorizationParser())
    server.use(restify.dateParser())
    server.use(restify.queryParser())
    server.use(restify.gzipResponse())
    server.use(restify.bodyParser())
    server.use(restify.requestLogger())
    */

    this.props.middlewares.map(_ => { server.use(_) })

/*
    server.use(restify.CORS({ origins: this.props.hostname
      ? [`http:\/\/${this.props.hostname}:${this.props.port}`]
      : [`http:\/\/localhost:${this.props.port}`]
      , credentials: true
      , headers: ['content-type']
    }))
*/

    let publicPath = "http://localhost:2992/assets"
    let assetsPath = path.join(__dirname, '..', 'build', 'assets')
    let publicStaticPath = path.join(__dirname, '..', 'public')

    let renderer = new Renderer({ styleUrl: `${publicPath}/powerapi.css`
                                , scriptUrl: `${publicPath}/powerapi.js`
                                , commonsUrl: `${publicPath}/commons.js`
                                })

//    server.get(/\/assets\/?.*/, restify.serveStatic({ directory: assetsPath }))
//   server.get(/\/?.*/, function render(req, res, next) {
/*      renderer.render(
        req.path,
        prerenderApi(req),
        function(err, html) {
          if(err) {
            res.statusCode = 500
            res.contentType = "text; charset=utf8"
            res.end(err.message)
            return
          }
          res.contentType = "text/html; charset=utf8"
          res.end(html)
        })
    })
*/
    server.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '..', 'app', 'index.html'))
    })

    server.listen(this.props.port, this.props.hostname, err => {
      if (err) {
        console.error(err)
        return
      }
      console.log(`Listening at http:\/\/${this.props.hostname}:${this.props.port}`)
    })
  }
}

