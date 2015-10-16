import uuid from "uuid"
import DB from "./DB"

// The fake database
let todosDb = new DB()
let listsDb = new DB()
let chatRoomsDb = new DB()

function initData() {
  // Initial data
  let mylist = [uuid.v4(), uuid.v4(), uuid.v4()]
  let otherlist = [uuid.v4()]
  listsDb.set("mylist", mylist)
  listsDb.set("otherlist", otherlist)
  todosDb.set(mylist[0], {
    text: "Hello World"
  })
  todosDb.set(mylist[1], {
    text: "Eat something"
  })
  todosDb.set(mylist[2], {
    text: "Nothing"
  })
  todosDb.set(otherlist[0], {
    text: "12345679"
  })

  chatRoomsDb.set("home", [
    {
      user: "bot",
      message: "Welcome"
    }
  ])
  chatRoomsDb.set("room1", [])
}

initData()

export const todos = todosDb
export const lists = listsDb
export const chatRooms = chatRoomsDb

export const chatUsers = {
  get: function(name) {
    var count = chatRoomsDb.getIds().map(function(room) {
      return chatRoomsDb.get(room).filter(function(message) {
        return message.user === name
      }).length
    }).reduce(function(a, b) {
      return a + b
    }, 0)
    return {
      name: name,
      messages: count
    }
  }
}
