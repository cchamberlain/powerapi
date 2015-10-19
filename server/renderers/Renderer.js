import fs from "fs"
import path from "path"

let html = fs.readFileSync(path.resolve(__dirname, "../../app/index.html"), "utf-8")

export default class Renderer {
  constructor(options) {
    this.html = html.replace("SCRIPT_URL", options.scriptUrl).replace("STYLE_URL", options.styleUrl)
  }
  render(path, readItems, callback) {
    callback(null, this.html)
  }
}
