import { getDevTool } from './devtool'
import { getTarget } from './target'
import { getEntry } from './entry'
import { getOutput } from './output'
import { getResolve, getResolveLoader } from './resolve'
import { getLoaders } from './loaders'
import { getPlugins } from './plugins'


function make(name) {
  if(typeof name !== 'string')
    throw new Error('Name is required.')
  let target = getTarget(name)
  return  { name
          , target
          , devtool: getDevTool(name)
          , cache: true
          , context: __dirname
          , entry:  getEntry(name)
          , output: getOutput(name)
          , resolve: getResolve(name)
          , resolveLoader: getResolveLoader(name)
          , module: { loaders: getLoaders(name)
                    , noParse: /(jquery-ui)/
                    }
          , plugins: getPlugins(name)
          , node: target === 'web' ? { fs: 'empty', 'graceful-fs': 'empty' } : {}
          }
}

module.exports = make
module.exports['default'] = make
