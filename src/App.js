import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";

class App extends Component {
  render() {
    let i;
    let items = [];
    for (i = 0; i < 2; i++) {
      items.push("hi");
    }
    let list = items.map((item) => <p>{item}</p>);
    return (
      <div>
        <Header />
        <div className="Inner">{list}</div>
        <Footer />
      </div>
    );
  }
}

export default App;
