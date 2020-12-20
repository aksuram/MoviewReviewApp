import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Movies from "./Movies";
import Reviews from "./Reviews";
import Categories from "./Categories";
import Users from "./Users";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <div className="Inner">
            <Switch>
              <Route path="/movies" exact component={Movies} />
              <Route path="/reviews" exact component={Reviews} />
              <Route path="/categories" exact component={Categories} />
              <Route path="/users" exact component={Users} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
