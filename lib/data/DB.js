import update from "react/lib/update"

export default class DB {
  constructor(initialData) {
    this.data = initialData || {}
  }
}

DB.prototype.get = function(id, createDefaultData) {
  let d = this.data["_" + id]
  if(!d) {
    this.data["_" + id] = createDefaultData
    return createDefaultData
  }
  return d
}

DB.prototype.update = function(id, upd) {
  let res = this.data["_" + id] = update(this.data["_" + id], upd)
  return res
}

DB.prototype.set = function(id, data) {
  let res = this.data["_" + id] = data
  return res
}

DB.prototype.getIds = function() {
  return Object.keys(this.data).map(function(key) {
    return key.substr(1)
  })
}
