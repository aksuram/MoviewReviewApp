import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { fadeInDown } from "react-animations";
import { StyleSheet, css } from "aphrodite";
import { API_URL } from "./settings";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
    };
  }

  async componentDidMount() {
    let categories = [];
    const response = await fetch(`${API_URL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      let responseBody = await response.json();

      let i;
      for (i = 0; i < responseBody.length; i++) {
        categories.push(
          <tr>
            <td>{responseBody[i].id}</td>
            <td>{responseBody[i].name}</td>
          </tr>
        );
      }
      this.setState({ categories: categories });
    } else {
      console.log("ERROR categories list");
    }
  }

  render() {
    const styles = StyleSheet.create({
      fadeInCustom: {
        animationName: fadeInDown,
        animationDuration: "0.7s",
      },
    });

    document.title = "Categories";
    return (
      <div className="container">
        <h1 className="text-center mt-4">Categories</h1>
        <Table
          striped
          bordered
          hover
          className={css(styles.fadeInCustom) + " mt-4 shadow-sm"}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Category name</th>
            </tr>
          </thead>
          <tbody>{this.state.categories}</tbody>
        </Table>
      </div>
    );
  }
}

export default Categories;
