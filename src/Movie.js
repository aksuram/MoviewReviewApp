import React, { Component } from "react";

class Movie extends Component {
  render() {
    return (
      <div className="container text-center">
        <h1>Movie {this.props.match.params.id}</h1>
      </div>
    );
  }
}

export default Movie;
