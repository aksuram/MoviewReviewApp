import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { fadeInUp } from "react-animations";
import { StyleSheet, css } from "aphrodite";
import { API_URL } from "./settings";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
  }

  async componentDidMount() {
    let users = [];
    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      let responseBody = await response.json();

      let i;
      for (i = 0; i < responseBody.length; i++) {
        users.push(
          <tr>
            <td>{responseBody[i].id}</td>
            <td>{responseBody[i].username}</td>
            <td>{responseBody[i].creationDate.slice(0, 10)}</td>
            <td>
              {responseBody[i].lastLoginDate
                ? responseBody[i].lastLoginDate
                : "-"}
            </td>
            <td>{responseBody[i].role}</td>
          </tr>
        );
      }
      this.setState({ users: users });
    } else {
      console.log("ERROR users list");
    }
  }

  render() {
    const styles = StyleSheet.create({
      fadeInCustom: {
        animationName: fadeInUp,
        animationDuration: "0.7s",
      },
    });

    document.title = "Users";
    return (
      <div className="container">
        <h1 className="text-center mt-4">Users</h1>
        <Table
          striped
          bordered
          hover
          className={css(styles.fadeInCustom) + " mt-4 shadow-sm"}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Creation date</th>
              <th>Last login</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>{this.state.users}</tbody>
        </Table>
      </div>
    );
  }
}

export default Users;
