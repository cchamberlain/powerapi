import React from "react";
import { RouteHandler } from "react-router";

import { stores } from "../stores"

import bootstrap from "bootstrap-webpack"
import fontawesome from "font-awesome-webpack"
import styles from "./Application.less"

import { Grid, Row, Col } from "react-bootstrap"

export default class Application extends React.Component {
  static getProps(params) {
    return {}
  }
  /*
  static getProps(stores, params) {
    var transition = stores.Router.getItem("transition")
    return {
      loading: !!transition
    }
  }
  */
  render() {
   // var { loading } = this.props;
        return <Grid>
            <Row>
                <Col xs={12}>
                This shit works yo
                </Col>
            </Row>
    </Grid>
  }
}

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


Application.contextTypes = {
  stores: React.PropTypes.object
};
*/
