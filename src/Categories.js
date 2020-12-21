import React, { Component } from "react";
import { logoutUser } from "./authentication";

class Categories extends Component {
  render() {
    logoutUser();
    return (
      <div className="container text-center">
        <h1>Categories</h1>
      </div>
    );
  }
}

export default Categories;
