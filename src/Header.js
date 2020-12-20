import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

class Header extends Component {
  render() {
    return (
      <header>
        <Navbar bg="dark" variant="dark" sticky="top" expand="md">
          <Navbar.Brand href="#">MovieReview</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#link">Movies</Nav.Link>
              <Nav.Link href="#link">Reviews</Nav.Link>
              <Nav.Link href="#link">Categories</Nav.Link>
              <Nav.Link href="#link">Users</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Button variant="outline-primary">Login</Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
