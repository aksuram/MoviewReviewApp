import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { logoutUser } from "./authentication";

class Logout extends Component {
  constructor(props) {
    super(props);
    logoutUser();
    this.props.refreshApp();
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default Logout;
