import React, { Component } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { loginUser } from "./authentication";
import {
  API_URL,
  NUMBER_PATTERN,
  WORD_PATTERN,
  USERNAME_PATTERN,
  EMAIL_PATTERN,
  DOUBLE_PATTERN,
  DATE_PATTERN,
} from "./settings";

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
      this.props.refreshHome();
      form = <Redirect to="/" />;
    } else {
      form = (
        <Card
          style={{ width: "300px", display: "table", margin: "0 auto" }}
          className="mt-5 shadow-sm"
        >
          <Card.Body>
            <Form onSubmit={this.login}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  maxLength="50"
                  required="required"
                  pattern={USERNAME_PATTERN}
                  title="Enter a viable username from 5 to 50 characters using alfanumerics"
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
                  title="Password needs to be at least 8 characters long"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </Form.Group>
              {error}
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      );
    }

    return (
      <div className="container">
        <h1 className="text-center mt-5">Login</h1>
        {form}
      </div>
    );
  }
}

export default Login;
