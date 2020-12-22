import React, { Component } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { API_URL, USERNAME_PATTERN, EMAIL_PATTERN } from "./settings";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      message: null,
      error: false,
      successfull: false,
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

  register = async (event) => {
    event.preventDefault();

    const formData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    let message = null;
    if (response.status === 201) {
      message = "Registration was successfull";

      this.setState({ message: message, error: false, successfull: true });
    } else {
      if (response.status === 409) {
        message = "A user already exists with the same name";
      } else if (response.status === 500) {
        message = "Error: Unknown exception occured";
      } else {
        message = "Error: Unknown exception occured";
      }

      this.setState({ message: message, error: true, successfull: false });
    }
    //TODO: refresh page ?
  };

  render() {
    document.title = "Register";
    let form;
    let error;

    if (this.state.error) {
      error = <Alert variant="danger">{this.state.message}</Alert>;
    }

    if (!this.state.error && this.state.successfull) {
      //this.setState({ error: false, message: null }); ??
      //TODO: REFRESH THE PAGE?
      //this.props.refreshHome();
      form = <Redirect to="/login" />;
    } else {
      form = (
        <Card
          style={{ width: "300px", display: "table", margin: "0 auto" }}
          className="mt-5 shadow-sm"
        >
          <Card.Body>
            <Form onSubmit={this.register}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  maxLength="50"
                  minLength="5"
                  required="required"
                  pattern={USERNAME_PATTERN}
                  title="Enter a viable username from 5 to 50 characters using alfanumerics"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  maxLength="100"
                  minLength="5"
                  required="required"
                  pattern={EMAIL_PATTERN}
                  title="Enter a viable email from 5 to 100 characters long"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  maxLength="60"
                  minLength="8"
                  required="required"
                  placeholder="Enter your password"
                  title="Password needs to be at least 8 characters long"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </Form.Group>
              {error}
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </Card.Body>
        </Card>
      );
    }

    return (
      <div className="container">
        <h1 className="text-center mt-5">Register</h1>
        {form}
      </div>
    );
  }
}

export default Register;
