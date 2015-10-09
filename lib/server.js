import restify from "restify"
import path from "path"
import Renderer from "./renderers/SimpleRenderer"
import prerenderApi from "./api/prerender"


export default function (options) {
  let server = restify.createServer()
  server.pre(restify.pre.userAgentConnection());

  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.authorizationParser());
  server.use(restify.dateParser());
  server.use(restify.queryParser());
  server.use(restify.gzipResponse());
  server.use(restify.bodyParser());
  server.use(restify.requestLogger());

  server.use(restify.CORS({
    origins: ['https://devtix.net', 'http://localhost:8080', ],   // defaults to ['*']
    credentials: true,                 // defaults to false
    headers: ['content-type']                 // sets expose-headers
  }))

  // require the page rendering logic
  let publicPath = "http://localhost:2992/assets"
  let assetsPath = path.join(__dirname, '..', 'build', 'assets')
  let publicStaticPath = path.join(__dirname, '..', 'public')

  let renderer = new Renderer({ styleUrl: `${publicPath}/powerapi.css`
                              , scriptUrl: `${publicPath}/powerapi.js`
                              , commonsUrl: `${publicPath}/commons.js`
                              })

  server.get(/\/assets\/?.*/, restify.serveStatic({ directory: assetsPath }))
  /*
  server.get(/\//, function publicStatic(req, res, next) {
      restify.serveStatic({ directory: publicStaticPath })
      next()
    }
  )
*/

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
      }
    )
  })

  server.listen(options.port, function listening() {
    console.log(`${server.name} listening at ${server.url}`)
  })
}

