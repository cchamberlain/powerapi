import fs from "fs"
import path from "path"

let html = fs.readFileSync(path.resolve(__dirname, "../../app/index.html"), "utf-8")

export default class SimpleRenderer {
  constructor(options) {
    this.html = html.replace("SCRIPT_URL", options.scriptUrl)
  }
}

SimpleRenderer.prototype.render = function(_path, _readItems, callback) {
  callback(null, this.html)
}
