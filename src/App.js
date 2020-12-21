import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Movies from "./Movies";
import Movie from "./Movie";
import Reviews from "./Reviews";
import Review from "./Review";
import Categories from "./Categories";
import Users from "./Users";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Home from "./Home";
import NotFound from "./NotFound";
import User from "./User";
import { getUserRole } from "./authentication";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

class App extends Component {
  refreshApp = () => {
    this.forceUpdate();
  };

  render() {
    let role = getUserRole();
    let router = "";

    if (role === "a") {
      router = (
        <Switch>
          <Route
            path="/movies"
            exact
            component={(props) => (
              <Movies refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/movie/:id(\d+)"
            exact
            component={(props) => (
              <Movie refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/reviews"
            exact
            component={(props) => (
              <Reviews refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/review/:id(\d+)"
            exact
            component={(props) => (
              <Review refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/categories"
            exact
            component={(props) => (
              <Categories refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/users"
            exact
            component={(props) => (
              <Users refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/user"
            exact
            component={(props) => (
              <User refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/login"
            exact
            component={(props) => (
              <Login refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/logout"
            exact
            component={(props) => (
              <Logout refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/register"
            exact
            component={(props) => (
              <Register refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/404"
            exact
            component={(props) => (
              <NotFound refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/"
            exact
            component={(props) => (
              <Home refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      );
    } else if (role === "u") {
      router = (
        <Switch>
          <Route
            path="/movies"
            exact
            component={(props) => (
              <Movies refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/movie/:id(\d+)"
            exact
            component={(props) => (
              <Movie refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/reviews"
            exact
            component={(props) => (
              <Reviews refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/review/:id(\d+)"
            exact
            component={(props) => (
              <Review refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/categories"
            exact
            component={(props) => (
              <Categories refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/users"
            exact
            component={(props) => (
              <Users refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/user"
            exact
            component={(props) => (
              <User refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/login"
            exact
            component={(props) => (
              <Login refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/logout"
            exact
            component={(props) => (
              <Logout refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/register"
            exact
            component={(props) => (
              <Register refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/404"
            exact
            component={(props) => (
              <NotFound refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/"
            exact
            component={(props) => (
              <Home refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      );
    } else {
      router = (
        <Switch>
          <Route
            path="/movies"
            exact
            component={(props) => (
              <Movies refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/movie/:id(\d+)"
            exact
            component={(props) => (
              <Movie refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/reviews"
            exact
            component={(props) => (
              <Reviews refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/review/:id(\d+)"
            exact
            component={(props) => (
              <Review refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/categories"
            exact
            component={(props) => (
              <Categories refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/users"
            exact
            component={(props) => (
              <Users refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/user"
            exact
            component={(props) => (
              <User refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/login"
            exact
            component={(props) => (
              <Login refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/logout"
            exact
            component={(props) => (
              <Logout refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/register"
            exact
            component={(props) => (
              <Register refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/404"
            exact
            component={(props) => (
              <NotFound refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route
            path="/"
            exact
            component={(props) => (
              <Home refreshApp={this.refreshApp} {...props} />
            )}
          />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      );
    }

    return (
      <div>
        <Router>
          <Header />
          <div className="Inner">{router}</div>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
