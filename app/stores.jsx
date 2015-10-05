/*globals __StoreData */

// This file describe where stores read data from and where stores write data to.

import ItemsStore from "items-store/ItemsStore"
import async from "async"
import { readSingleItem, writeAndReadSingleItem, readMultipleItems } from "api/rest"

// a queue that allows only one REST request at a time
// it also defers the requests to next tick, to aggregate multiple changes
let queue = async.queue(function(fn, callback) {
  process.nextTick(function() {
    fn(callback)
  })
}, 1)

// load embedded initial store data from prerendering if available
let initialData = typeof __StoreData === "object" ? __StoreData : {}

// take the store descriptions as base
import metadata from "./stores-metadata";

function todoListPlusItems(result) {
  Object.keys(result.items).forEach(function(key) {
    storesInternal.TodoItem.setItemData(key.substr(1), result.items[key])
  })
  return result.list
}

function chatRoomPlusUsers(result) {
  Object.keys(result.users).forEach(function(key) {
    storesInternal.ChatUser.setItemData(key.substr(1), result.users[key])
  })
  return result.room
}


// helper methods to extract embedded data from results

let storesInternal = {

  Router: new ItemsStore(metadata.Router),

  TodoList: new ItemsStore({
    // REST API at "/_/list/" (read/write)
    // the API also returns "TodoItem"s for requests

    writeAndReadSingleItem: writeAndReadSingleItem("/_/list/", todoListPlusItems),
    readSingleItem: readSingleItem("/_/list/", todoListPlusItems),

    queueRequest: queue.push.bind(queue),
    ...metadata.TodoList
  }, initialData.TodoList),

  TodoItem: new ItemsStore({
    // REST API at "/_/todo" (read/write)
    // it supports reading up to 10 items at once

    writeAndReadSingleItem: writeAndReadSingleItem("/_/todo/"),
    readSingleItem: readSingleItem("/_/todo/"),
    readMultipleItems: readMultipleItems("/_/todo/"),

    queueRequest: queue.push.bind(queue),
    maxWriteItems: 10,
    ...metadata.TodoItem
  }, initialData.TodoItem),

  ChatRoom: new ItemsStore({
    // REST API at "/_/chat-room" (read/write)
    // the API also returns "ChatUsers"s for requests

    writeAndReadSingleItem: writeAndReadSingleItem("/_/chat-room/", chatRoomPlusUsers),
    readSingleItem: readSingleItem("/_/chat-room/", chatRoomPlusUsers),

    queueRequest: queue.push.bind(queue),
    ...metadata.ChatRoom
  }, initialData.ChatRoom),

  ChatUser: new ItemsStore({
    // REST API at "/_/chat-user" (read only)

    readSingleItem: readSingleItem("/_/chat-user/"),

    queueRequest: queue.push.bind(queue),
    ...metadata.ChatUser
  }, initialData.ChatUser)
}



// bind actions to stores


import { Todo, Chat } from "./actions";

Todo.fetch.listen(function() {
  storesInternal.TodoList.update()
  storesInternal.TodoItem.update()
})

Todo.add.listen(function(list, item) {
  storesInternal.TodoList.updateItem(list, { $push: [item] })
})

Todo.update.listen(function(id, update) {
  storesInternal.TodoItem.updateItem(id, update)
})

Todo.fetchItem.listen(function(id) {
  storesInternal.TodoItem.update(id)
})

Chat.fetch.listen(function() {
  storesInternal.ChatRoom.update()
  storesInternal.ChatUser.update()
})

Chat.send.listen((room, msg) => {
  storesInternal.ChatRoom.updateItem(room, [msg])
})

export const stores = storesInternal
