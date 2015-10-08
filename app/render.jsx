import async from "async"
import React from "react"
import Router from "react-router"
import ReactDOM from "react-dom"
import ReactUpdates from "react/lib/ReactUpdates"
import StoresWrapper from "./StoresWrapper"
import withTimeout from "./helpers/withTimeout"

export default function renderApplication(routes, stores, options) {
  let timeout = options.timeout || 600
  let initialRun = true

  // react-router handles location
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById("content"))
  /*
  Router.run(routes, Router.HistoryLocation, function(Application, state) {

    // On every page navigation invalidate data from the stores
    // This is not needed when the server notifies the client about changes (WebSocket, SSE)
    if(!initialRun) {
      Object.keys(stores).forEach(function(key) {
        stores[key].outdate()
      })
    }
    initialRun = false

    ReactUpdates.batchedUpdates(function() {
      stores.Router.setItemData("transition", state)
    })

    // try to fetch data for a defined timespan
    // when the data is not fully fetched after the timeout components are rendered (with missing/old data)
    withTimeout(async.forEach.bind(async, state.routes, function(route, callback) {
      if(route.handler.chargeStores) {
        route.handler.chargeStores(stores, state.params, callback)
      } else {
        callback()
      }
    }), timeout, function() {

      ReactUpdates.batchedUpdates(function() {
        stores.Router.setItemData("transition", null)
      })

      // Render the components with the stores
      ReactDOM.render(
        <StoresWrapper Component={Application} stores={stores}/>,
        document.getElementById("content")
      )
    })
*/
  }

