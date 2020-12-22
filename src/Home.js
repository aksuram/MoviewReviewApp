import React, { Component } from "react";
import { Image } from "react-bootstrap";

class Home extends Component {
  render() {
    document.title = "MovieReview";
    if (this.props.needsRefreshing === true) {
      this.props.refreshApp();
    }

    return (
      <div className="container text-center home-container">
        <h1 className="text-center mt-4">Movie review website</h1>
        <Image
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1040&q=80"
          rounded
          fluid
          className="mt-3 mb-3"
        />
        <a href="https://unsplash.com/photos/CiUR8zISX60">
          Copyright - Jakob Owens
        </a>
      </div>
    );
  }
}

export default Home;
