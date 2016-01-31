import fs from 'fs'
import path from 'path'
import bindAll from 'lodash.bindall'

let html = fs.readFileSync(path.resolve(__dirname, '../../public/static/html/index.html'), 'utf-8')

export default class Renderer {
  static methods = ['render'];
  constructor(props = {}) {
    if(props.scriptUrl)
      html = html.replace('SCRIPT_URL', props.scriptUrl)
    if(props.styleUrl)
      html = html.replace('STYLE_URL', props.styleUrl)
    this.html = html

    bindAll(this, Renderer.methods)
  }
  render(callback) {
    callback(this.html)
  }
}

if(module.hot) {
  module.hot.accept()
}