import React, { Component } from "react";
import { API_URL } from "./settings";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    let user = null;
    const response = await fetch(
      `${API_URL}/users/${this.props.match.params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      let responseBody = await response.json();
      console.log(responseBody);
      this.setState({ user: user });
    } else {
      console.log("ERROR couldn't get user");
    }
  }

  render() {
    document.title = "User";
    return (
      <div className="container">
        <h1 className="text-center mt-4 mb-3">User</h1>
      </div>
    );
  }
}

export default User;
