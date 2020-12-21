import React, { Component } from "react";

class Home extends Component {
  render() {
    if (this.props.needsRefreshing === true) {
      this.props.refreshApp();
    }
    let i;
    let items = [];
    for (i = 0; i < 25; i++) {
      items.push("hi");
    }
    let list = items.map((item) => <p>{item}</p>);

    return (
      <div className="container text-center">
        <h1>Home</h1>
        {list}
      </div>
    );
  }
}

export default Home;
