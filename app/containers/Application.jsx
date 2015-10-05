import React from "react";
import { RouteHandler } from "react-router";

import bootstrap from "bootstrap-webpack"
import fontawesome from "font-awesome-webpack"
import styles from "./Application.less"

import { Grid, Row, Col } from "react-bootstrap"

export default class Application extends React.Component {
  static getProps(stores, params) {
    var transition = stores.Router.getItem("transition")
    return {
      loading: !!transition
    }
  }
  render() {
    var { loading } = this.props;
        return <Grid>
            <Row>
                <Col xs={12}>
                This shit works yo
                </Col>
            </Row>
    </Grid>
  }
}

Application.contextTypes = {
  stores: React.PropTypes.object
};
