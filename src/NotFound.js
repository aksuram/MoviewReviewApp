import React, { Component } from "react";

class NotFound extends Component {
  render() {
    document.title = "404: Not Found";
    return (
      <div className="container text-center">
        <h1>404: Not Found</h1>
      </div>
    );
  }
}

export default NotFound;
