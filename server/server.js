import restify from "restify"
import path from "path"
import Renderer from "./renderers/Renderer"
import prerenderApi from "./api/prerender"


export default class Server {
  constructor(options) {
    this.props = options
  }
  start() {

    let server = restify.createServer()
    server.pre(restify.pre.userAgentConnection())

    server.use(restify.acceptParser(server.acceptable))
    server.use(restify.authorizationParser())
    server.use(restify.dateParser())
    server.use(restify.queryParser())
    server.use(restify.gzipResponse())
    server.use(restify.bodyParser())
    server.use(restify.requestLogger())

    server.use(restify.CORS({ origins: this.props.hostname
      ? [`http:\/\/${this.props.hostname}:${this.props.port}`]
      : [`http:\/\/localhost:${this.props.port}`]
      , credentials: true
      , headers: ['content-type']
    }))

    let publicPath = "http://localhost:2992/assets"
    let assetsPath = path.join(__dirname, '..', 'build', 'assets')
    let publicStaticPath = path.join(__dirname, '..', 'public')

    let renderer = new Renderer({ styleUrl: `${publicPath}/powerapi.css`
                                , scriptUrl: `${publicPath}/powerapi.js`
                                , commonsUrl: `${publicPath}/commons.js`
                                })

    server.get(/\/assets\/?.*/, restify.serveStatic({ directory: assetsPath }))
    server.get(/\/?.*/, function render(req, res, next) {
      renderer.render(
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

    server.listen(this.props.port, function listening() {
      console.log(`${server.name} listening at ${server.url}`)
    })
  }
}

