var path = require("path")
  , join = path.join
  , webpack = require("webpack")

module.exports = function(options) {
  var root = path.join(__dirname, "app")
  var loaders = [ { test: /\.jsx$/, loader: "babel-loader?stage=0" }
                , { test: /\.js$/, loader: "babel-loader?stage=0", include: path.join(__dirname, "app") }
                , { test: /\.json$/, loader: "json-loader" }
                , { test: /\.less$/, loader: "style!css!less" }
                , { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" }
                , { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
                ]

  var extensions = ["", ".webpack.js", ".web.js", ".js", ".jsx"]

  var plugins = [ new webpack.PrefetchPlugin("react")
                , new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
                ]

  if(options.minifyJs) {
    plugins.push(new webpack.optimize.DedupePlugin())
    plugins.push(new webpack.optimize.UglifyJsPlugin())
  }

  return  { cache: true
          , watch: options.watch
          , entry: [
            './app/index.jsx'
          ]
          , output: { path: join(__dirname, 'build', 'assets')
                    , publicPath: 'http://localhost:2992/assets/'
                    , filename: 'powerapi.js'
                    , chunkFilename: "[chunkhash].js"
                    }
          , resolve:  { root: root
                      , extensions: extensions
                      }
          , module: { loaders: loaders }
          , plugins: plugins
          , devServer:  { stats: { cached: true } }
          }
}
