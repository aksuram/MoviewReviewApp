import React, { Component } from "react";
import { Card, Row, Col, Image, Button, Modal, Alert } from "react-bootstrap";
import { API_URL } from "./settings";
import { ReactComponent as StarIcon } from "./icons/star-with-five-points.svg";
import { getUserRole } from "./authentication";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = { movie: null, title: null, button: null, showModal: false };
  }

  getCategoryName(response, id) {
    let i;
    let name = "";

    for (i = 0; i < response.length; i++) {
      if (response[i].id === id) {
        name = response[i].name;
      }
    }

    return name;
  }

  async componentDidMount() {
    //Categories
    const categoryResponse = await fetch(`${API_URL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let categoryResponseBody = null;

    if (categoryResponse.status === 200) {
      categoryResponseBody = await categoryResponse.json();
    } else {
      console.log("ERROR categories list");
    }

    //Movie
    let movie = null;
    const response = await fetch(
      `${API_URL}/movies/${this.props.match.params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      let responseBody = await response.json();
      this.setState({ title: responseBody.title });

      movie = (
        <Card className="mt-4 shadow-sm">
          <Card.Body>
            <Row>
              <Col>
                <div className="text-cutoff movie-image">
                  <Image
                    src="https://dummyimage.com/135x200/583bbf/ffffff.png"
                    rounded
                  />
                </div>
              </Col>
              <Col xs={8}>
                <Card.Title>
                  <div className="text-cutoff custom-movie-bottom-color">
                    {responseBody.title}
                  </div>
                </Card.Title>
                <Card.Text className="text-muted">
                  <div className="line-clamp">{responseBody.description}</div>
                </Card.Text>
                <Row>
                  <Col>
                    <Card.Subtitle className="mt-2">
                      <h6 className="custom-movie-bottom-color">
                        {this.getCategoryName(
                          categoryResponseBody,
                          responseBody.categoryId
                        )}
                      </h6>
                    </Card.Subtitle>
                  </Col>
                  <Col xs={4}>
                    <Card.Subtitle className="mt-2">
                      <Row>
                        <Col xs={3}>
                          <StarIcon height={25} fill="yellow" stroke="grey" />
                        </Col>
                        <Col className="movie-rating">
                          <h5 className="custom-movie-bottom-color">
                            {responseBody.rating ? responseBody.rating : "---"}
                          </h5>
                        </Col>
                      </Row>
                    </Card.Subtitle>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="mt-2">
              <Row>
                <Col>
                  <h6 className="text-muted movie-bottom-info">
                    Age rating:{" "}
                    {responseBody.ageRating ? responseBody.ageRating : "---"}
                  </h6>
                </Col>
                <Col>
                  <h6 className="text-muted movie-bottom-info">
                    Length:{" "}
                    {responseBody.length
                      ? Math.floor(responseBody.length / 60) +
                        ":" +
                        (responseBody.length % 60)
                      : "---"}
                  </h6>
                </Col>
                <Col xs={3}>
                  <h6 className="text-muted movie-bottom-info">
                    {responseBody.releaseDate
                      ? responseBody.releaseDate.slice(0, 10)
                      : "---"}
                  </h6>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      );

      this.setState({ movie: movie });

      if (getUserRole() === "a") {
        let button = (
          <Button
            className="mt-3 ml-2"
            variant="danger"
            onClick={this.handleClick}
          >
            Delete Movie
          </Button>
        );
        this.setState({ button: button });
      }
    } else {
      //TODO: Go to 404
      console.log("ERROR movies list");
    }
  }

  deleteMovie = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `${API_URL}/movies/${this.props.match.params.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      }
    );

    let message = null;
    if (response.status === 200) {
      message = "Successfully deleted a movie";
      //window.location.href = "/movies";

      this.setState({
        message: message,
        error: false,
        showModal: false,
        movie: null,
        button: null,
      });
    } else {
      if (response.status === 401) {
        message = "Unauthorized to delete movies";
      } else if (response.status === 403) {
        message = "Forbidden to delete movies";
      } else if (response.status === 404) {
        message = "Impossible to delete movie because it doesn't exist";
      } else if (response.status === 409) {
        message = "Impossible to delete movie because of a conflict";
      } else if (response.status === 500) {
        message = "Error: Unknown exception occured";
      } else {
        message = "Error: Unknown exception occured";
      }

      this.setState({ message: message, error: true, showModal: false });
      //TODO: redirect to movie list
    }
  };

  handleClick = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    document.title = this.state.title;

    let modal = (
      <Modal
        show={this.state.showModal}
        onHide={this.handleClick}
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Do you really want to delete it?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="danger" type="submit" onClick={this.deleteMovie}>
            Delete Movie
          </Button>
        </Modal.Body>
      </Modal>
    );
    let alert = null;
    if (this.state.error) {
      alert = <Alert variant="danger">Couldn't delete the movie</Alert>;
    } else if (this.state.movie === null && !this.state.error) {
      alert = <Alert variant="success">Successfully deleted the movie</Alert>;
    }

    return (
      <div className="container">
        <h1 className="text-center mt-4 title-cutoff">{this.state.title}</h1>
        {alert}
        {modal}
        {this.state.movie}
        {this.state.button}
      </div>
    );
  }
}

export default Movie;
