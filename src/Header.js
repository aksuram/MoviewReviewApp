import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header>
        <Navbar
          collapseOnSelect
          bg="dark"
          variant="dark"
          sticky="top"
          expand="md"
        >
          <Navbar.Brand as={Link} to="/">
            MovieReview
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>
              <Nav.Link as={Link} to="/reviews">
                Reviews
              </Nav.Link>
              <Nav.Link as={Link} to="/categories">
                Categories
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link
                className="nav-register-button"
                as={Link}
                to="/register"
              >
                Register
              </Nav.Link>
              <Button variant="outline-primary" as={Link} to="/login">
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
