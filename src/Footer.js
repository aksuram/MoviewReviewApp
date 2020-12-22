import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="custom-footer py-3 bg-dark text-muted">
        <div className="container text-center align-middle">
          <p>Movie review website - Tadas Maruška 2020</p>
          <div>
            <p>
              Icons made by{" "}
              <a href="https://www.flaticon.com/authors/freepik">Freepik</a>
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
