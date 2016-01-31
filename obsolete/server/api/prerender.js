import { todos, lists, chatRooms, chatUsers } from "../data/dbs"

export default function(/* req */) {
  let api = {}

  api.TodoItem = function(item, callback) {
    callback(null, todos.get(item.id, {}))
  }

  api.TodoList = function(item, callback) {
    callback(null, lists.get(item.id, []))
  }

  api.ChatRoom = function(item, callback) {
    callback(null, chatRooms.get(item.id, []))
  }

  api.ChatUser = function(item, callback) {
    callback(null, chatUsers.get(item.id))
  }

  return api
}
