import { server, client, baseUrl, resolveRoot } from '../config.server'
import { join } from 'path'

const getAppendage = name => name === 'shim' ? '-shim' : ''
const getFilename = name => `[name]${getAppendage(name)}.js`
const getChunkFilename = name => `chunk-[name]${getAppendage(name)}.js`
const getSourceMapFilename = name => `[file]${getAppendage(name)}.map`
const getDevtoolModuleFilenameTemplate = name => 'file:///[absolute-resource-path]'
const getHotUpdateChunkFilename = name => `[id].[hash]${getAppendage(name)}.hot-update.js`
const getHotUpdateMainFilename = name => `[hash]${getAppendage(name)}.hot-update.json`
const getCrossOriginLoading = name => 'anonymous'

export function getOutput(name) {
  let output =  { path: resolveRoot('public', name === 'static' ? 'static' : 'assets')
                , pathinfo: process.env.NODE_ENV === 'hot'
                , publicPath: `${baseUrl}/${name === 'static' ? 'static' : 'assets'}/`
                , filename: getFilename(name)
                , chunkFilename: getChunkFilename(name)
                //, devtoolModuleFilenameTemplate: getDevtoolModuleFilenameTemplate(name)
                //, sourceMapFilename: getSourceMapFilename(name)
                /*
                , hotUpdateChunkFilename: getHotUpdateChunkFilename(name)
                , hotUpdateMainFilename: getHotUpdateMainFilename(name)
                , crossOriginLoading: getCrossOriginLoading(name)
                */
                }
  console.warn('OUTPUT', JSON.stringify(output))
  return output
}
