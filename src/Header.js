import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUserRole } from "./authentication";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { activeNavLink: null };
  }
  setActiveNavLink = (eventKey) => {
    this.setState({ activeNavLink: eventKey });
  };

  render() {
    let role = getUserRole();
    let navbarLeft = "";
    let navbarRight = "";

    if (role === "a") {
      navbarLeft = (
        <Nav className="mr-auto" activeKey={this.state.activeNavLink}>
          <Nav.Link
            as={Link}
            to="/movies"
            onClick={() => this.setActiveNavLink("/movies")}
            eventKey="/movies"
          >
            Movies
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/reviews"
            onClick={() => this.setActiveNavLink("/reviews")}
            eventKey="/reviews"
          >
            Reviews
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/categories"
            onClick={() => this.setActiveNavLink("/categories")}
            eventKey="/categories"
          >
            Categories
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/users"
            onClick={() => this.setActiveNavLink("/users")}
            eventKey="/users"
          >
            Users
          </Nav.Link>
        </Nav>
      );

      navbarRight = (
        <Nav className="ml-auto" activeKey={this.state.activeNavLink}>
          <Nav.Link
            className="nav-register-button"
            as={Link}
            to="/user"
            onClick={() => this.setActiveNavLink("/user")}
            eventKey="/user"
          >
            <b>{window.localStorage.getItem("username")}</b>
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/logout"
            onClick={() => this.setActiveNavLink("/logout")}
            eventKey="/logout"
          >
            Logout
          </Nav.Link>
        </Nav>
      );
    } else if (role === "u") {
      navbarLeft = (
        <Nav className="mr-auto" activeKey={this.state.activeNavLink}>
          <Nav.Link
            as={Link}
            to="/movies"
            onClick={() => this.setActiveNavLink("/movies")}
            eventKey="/movies"
          >
            Movies
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/reviews"
            onClick={() => this.setActiveNavLink("/reviews")}
            eventKey="/reviews"
          >
            Reviews
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/categories"
            onClick={() => this.setActiveNavLink("/categories")}
            eventKey="/categories"
          >
            Categories
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/users"
            onClick={() => this.setActiveNavLink("/users")}
            eventKey="/users"
          >
            Users
          </Nav.Link>
        </Nav>
      );

      navbarRight = (
        <Nav className="ml-auto" activeKey={this.state.activeNavLink}>
          <Nav.Link
            className="nav-register-button"
            as={Link}
            to="/user"
            onClick={() => this.setActiveNavLink("/user")}
            eventKey="/user"
          >
            <b>{window.localStorage.getItem("username")}</b>
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/logout"
            onClick={() => this.setActiveNavLink("/logout")}
            eventKey="/logout"
          >
            Logout
          </Nav.Link>
        </Nav>
      );
    } else {
      navbarLeft = (
        <Nav className="mr-auto" activeKey={this.state.activeNavLink}>
          <Nav.Link
            as={Link}
            to="/movies"
            onClick={() => this.setActiveNavLink("/movies")}
            eventKey="/movies"
          >
            Movies
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/reviews"
            onClick={() => this.setActiveNavLink("/reviews")}
            eventKey="/reviews"
          >
            Reviews
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/categories"
            onClick={() => this.setActiveNavLink("/categories")}
            eventKey="/categories"
          >
            Categories
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/users"
            onClick={() => this.setActiveNavLink("/users")}
            eventKey="/users"
          >
            Users
          </Nav.Link>
        </Nav>
      );

      navbarRight = (
        <Nav className="ml-auto" activeKey={this.state.activeNavLink}>
          <Nav.Link
            className="nav-register-button"
            as={Link}
            to="/register"
            onClick={() => this.setActiveNavLink("/register")}
            eventKey="/register"
          >
            Register
          </Nav.Link>
          <Button
            variant="outline-primary"
            as={Link}
            to="/login"
            onClick={() => this.setActiveNavLink("/login")}
          >
            Login
          </Button>
        </Nav>
      );
    }

    return (
      <header>
        <Navbar
          collapseOnSelect
          variant="dark"
          sticky="top"
          expand="md"
          style={{ backgroundColor: "#8066af" }}
        >
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={() => this.setActiveNavLink("/")}
          >
            MovieReview
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {navbarLeft}
            {navbarRight}
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
