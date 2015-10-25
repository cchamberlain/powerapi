import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

let join = path.join

export default function makeConfig(options) {
  let root = join(__dirname, "app")
  let loaders = [ //{ test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' }
                //, { test: /\.jsx?$/, loaders: ['babel'], include: path.join(__dirname, "app") }
               // ,
                { test: /\.js$|\.jsx$|\.es6$|\.babel$/, include: /app/
                  , loader: 'babel'
                  , query:  { stage: 0
                            , plugins: ['react-transform']
                            , "extra":
                              { "react-transform":
                                { "transforms":
                                  [ { "transform": "react-transform-hmr"
                                    , "imports": ["react"]
                                    , "locals": ["module"]
                                    }
                                  , { "transform": "react-transform-catch-errors"
                                    , "imports": ["react", "redbox-react"]
                                    }
                                  ]
                                }
                              }
                            }
                  }
                //, { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
                /*
                , { test: /\.jsx$/, loader: 'babel', exclude: /node_modules/, query:
                    { optional: ['runtime']
                    , plugins: ['react-transform']
                    , extra: { 'react-transform':
                                { transforms: [ { transform: 'react-transform-hmr'
                                      , imports: ['react']
                                      , locals: ['module']
                                      }
                                    , { transform: 'react-transform-catch-errors'
                                      , imports: ['react', 'redbox-react']
                                      }
                                    ]
                                }
                              }
                    }
                  }
                  */
                  , { test: /\.json$/, loader: "json-loader" }
                  , { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
                  , { test: /\.css$/, loader: 'style-loader!css-loader' }
                //, { test: /\.less$/, loader: ExtractTextPlugin.extract('css?sourceMap!less?sourceMap') }
                , { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" }
                , { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
                ]

                /*

{
  "stage": 0,
  "env": {
    // this plugin will be included only in development mode, e.g.
    // if NODE_ENV (or BABEL_ENV) environment variable is not set
    // or is equal to "development"
    "development": {
      "plugins": [
        // Include babel-plugin-react-display-name if you’re
        // using React.createClass() *before* react-transform:
        // "react-display-name",
        "react-transform"
      ],
      "extra": {
        // must be an object
        "react-transform": {
          // must be an array
          "transforms": [{
            // can be an NPM module name or a local path
            "transform": "react-transform-hmr",
            // see specific transform's docs for "imports" and "locals" it needs
            "imports": ["react"],
            "locals": ["module"]
          }, {
            // you can have many transforms, not just one
            "transform": "react-transform-catch-errors",
            "imports": ["react", "redbox-react"]
          }
          //, {
            // can be an NPM module name or a local path
            // "transform": "./src/my-custom-transform"
         // }
          ],
          // by default we only look for `React.createClass` (and ES6 classes)
          // but you can tell the plugin to look for different component factories:
          // factoryMethods: ["React.createClass", "createClass"]
        }
      }
    }
  }
}


*/

let extensions = ["", ".webpack.js", ".web.js", ".js", ".jsx"]

  //let plugins = [ new webpack.PrefetchPlugin("react")
  //              , new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")*/
  let plugins =
  [ new webpack.optimize.OccurenceOrderPlugin()
  , new webpack.HotModuleReplacementPlugin()
  , new webpack.NoErrorsPlugin()
  , new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery","window.jQuery": "jquery" })
  ]


  return  { devtool: 'eval'
          //, context: __dirname
          , entry:
            [ 'webpack-hot-middleware/client'
            //[ 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
            , 'bootstrap-webpack!./config/bootstrap.config.js'
            , 'font-awesome-webpack!./config/font-awesome.config.js'
            , './app/index'
            ]
          , output:
            { path: join(__dirname, 'dist')
              //path: join(__dirname, 'build', 'assets')
            , filename: 'bundle.js'
            , publicPath: '/static/'
            //, chunkFilename: "[chunkhash].js"
            }
          , resolveLoader:
            { modulesDirectories: ['web_modules', 'node_modules']
            }
          , resolve:
            { root: root
            , extensions: extensions
            , modulesDirectories: [ 'web_modules', 'node_modules' ]
            , fallback: [ 'node_modules/bootstrap/fonts' ]
            //, request: 'browser-request'
            }
          , module: { loaders: loaders }
          , plugins: plugins
          }
}
