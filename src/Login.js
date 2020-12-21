import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { API_URL } from "./settings";
import { loginUser } from "./authentication";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: null,
      successfulLogin: false,
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleUpState = (error) => {
    this.setState({ errorMessage: error });
  };

  login = async (event) => {
    event.preventDefault();
    let result = await loginUser(
      this.state.username,
      this.state.password,
      this.handleUpState
    );
    if (result === 200) {
      this.setState({ successfulLogin: true });
    }
  };

  render() {
    document.title = "Login";
    let form;
    let error;

    if (this.state.errorMessage) {
      error = <Alert variant="danger">{this.state.errorMessage}</Alert>;
    }

    if (window.localStorage.getItem("token") || this.state.successfulLogin) {
      form = <Redirect to="/" />;
    } else {
      form = (
        <div className="login-form">
          <Form onSubmit={this.login}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="username"
                placeholder="Enter your username"
                maxLength="50"
                required="required"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                maxLength="60"
                required="required"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
            {error}
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      );
    }

    return (
      <div className="container text-center">
        <h1>Login</h1>
        {form}
      </div>
    );
  }
}

export default Login;
