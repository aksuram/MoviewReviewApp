import React, { Component } from "react";
import { Link } from "react-router-dom";

class Movies extends Component {
  render() {
    return (
      <div className="container text-center">
        <h1>Movies</h1>
        <p>
          <Link to={`/movie/${1}`}>Movie</Link>
        </p>
      </div>
    );
  }
}

export default Movies;
