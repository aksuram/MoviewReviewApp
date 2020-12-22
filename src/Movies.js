import React, { Component } from "react";
import {
  Card,
  Row,
  Col,
  Image,
  Button,
  Modal,
  Form,
  Alert,
  Container,
} from "react-bootstrap";
import {
  API_URL,
  NUMBER_PATTERN,
  WORD_PATTERN,
  USERNAME_PATTERN,
  EMAIL_PATTERN,
  DOUBLE_PATTERN,
  DATE_PATTERN,
} from "./settings";
import { Link } from "react-router-dom";
import { ReactComponent as StarIcon } from "./icons/star-with-five-points.svg";
import { getUserRole } from "./authentication";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      button: null,
      modal: null,
      title: null,
      description: null,
      rating: null,
      ageRating: null,
      releaseDate: null,
      categoryId: null,
      length: null,
      showModal: false,
      categories: [],
      message: null,
      error: false,
    };
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

    //Movies
    let movieList = [];
    const response = await fetch(`${API_URL}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      let responseBody = await response.json();

      let i;
      for (i = 0; i < responseBody.length; i++) {
        movieList.push(
          <Card key={responseBody[i].id} className="mb-4 shadow-sm">
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
                    <div className="text-cutoff">
                      <Link
                        className="custom-link"
                        to={`/movie/${responseBody[i].id}`}
                      >
                        {responseBody[i].title}
                      </Link>
                    </div>
                  </Card.Title>
                  <Card.Text className="text-muted">
                    <div className="line-clamp">
                      {responseBody[i].description}
                    </div>
                  </Card.Text>
                  <Row>
                    <Col>
                      <Card.Subtitle className="mt-2">
                        <h6 className="custom-movie-bottom-color">
                          {this.getCategoryName(
                            categoryResponseBody,
                            responseBody[i].categoryId
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
                              {responseBody[i].rating
                                ? responseBody[i].rating
                                : "---"}
                            </h5>
                          </Col>
                        </Row>
                      </Card.Subtitle>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      }
      this.setState({ movies: movieList });

      //Add movie button
      if (getUserRole() === "a") {
        let button = (
          <Button
            className="mb-3 ml-2"
            variant="primary"
            onClick={this.handleClick}
          >
            Add Movie
          </Button>
        );
        this.setState({ button: button });
      }
    } else {
      console.log("ERROR movies list");
    }

    //Adds options for the modal to choose from
    let categories = [];
    let j;
    categories.push(
      <option hidden disabled selected value>
        -- select an option --
      </option>
    );
    for (j = 0; j < categoryResponseBody.length; j++) {
      categories.push(
        <option
          key={categoryResponseBody[j].id}
          value={categoryResponseBody[j].id}
        >
          {categoryResponseBody[j].name}
        </option>
      );
    }

    this.setState({ categories: categories });
  }

  //Handles the clicking of Add button and also the closing of the Add modal
  handleClick = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  //Changes the state when someone types something in the input fields
  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  addMovie = async (event) => {
    event.preventDefault();

    const formData = {
      title: this.state.title,
      description: this.state.description,
      rating: parseFloat(this.state.rating, 10),
      ageRating: this.state.ageRating,
      releaseDate: this.state.releaseDate,
      categoryId: parseInt(this.state.categoryId, 10),
      length: parseInt(this.state.length, 10),
    };

    const response = await fetch(`${API_URL}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    });

    let message = null;
    if (response.status === 201) {
      message = "Successfully created a movie";

      this.setState({ message: message, error: false });
    } else {
      if (response.status === 401) {
        message = "Unauthorized to create movies";
      } else if (response.status === 403) {
        message = "Forbidden to create movies";
      } else if (response.status === 409) {
        message = "Impossible to create movie because of a conflicting movie";
      } else if (response.status === 500) {
        message = "Error: Unknown exception occured";
      } else {
        message = "Error: Unknown exception occured";
      }

      this.setState({ message: message, error: true });
    }
    //TODO: refresh page after adding movie
  };

  render() {
    document.title = "Movies";
    //Modal for adding
    let modal = (
      <Modal show={this.state.showModal} onHide={this.handleClick} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="movieAddForm" onSubmit={this.addMovie}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={this.state.title}
                maxLength="200"
                pattern={WORD_PATTERN}
                title="Only use allowed symbols e.g. a-z 0-9 and most symbols used in text"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="description"
                value={this.state.description}
                rows={3}
                maxLength="5000"
                pattern={WORD_PATTERN}
                title="Only use allowed symbols e.g. a-z 0-9 and most symbols used in text"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="categoryId">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                value={this.state.categoryId}
                onChange={this.handleInputChange}
              >
                {this.state.categories}
              </Form.Control>
            </Form.Group>
            <Container>
              <Row>
                <Col xs={9} md={6} className="remove-padding-left">
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      type="text"
                      name="rating"
                      value={this.state.rating}
                      maxLength="4"
                      pattern={DOUBLE_PATTERN}
                      title="Only use allowed symbols e.g. 10, 2.5, 9, 8.1"
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={9} md={6} className="remove-padding-right">
                  <Form.Group controlId="ageRating">
                    <Form.Label>Age rating</Form.Label>
                    <Form.Control
                      type="text"
                      name="ageRating"
                      value={this.state.ageRating}
                      maxLength="10"
                      pattern={WORD_PATTERN}
                      title="Only use allowed symbols e.g. a-z 0-9 and most symbols used in text"
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={9} md={6} className="remove-padding-left">
                  <Form.Group controlId="releaseDate">
                    <Form.Label>Release date</Form.Label>
                    <Form.Control
                      type="text"
                      name="releaseDate"
                      value={this.state.releaseDate}
                      maxLength="10"
                      pattern={DATE_PATTERN}
                      title="Only use allowed symbols e.g. 1990-01-01"
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={9} md={6} className="remove-padding-right">
                  <Form.Group controlId="length">
                    <Form.Label>Length</Form.Label>
                    <Form.Control
                      type="text"
                      name="length"
                      value={this.state.length}
                      maxLength="4"
                      pattern={NUMBER_PATTERN}
                      title="Only use allowed symbols e.g. from 1 to 9999"
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            form="movieAddForm"
            variant="primary"
            type="submit"
            onClick={this.addMovie}
          >
            Add Movie
          </Button>
        </Modal.Footer>
      </Modal>
    );

    return (
      //Rendering the whole page
      <div className="container">
        <h1 className="text-center mt-4 mb-3">Movies</h1>
        {modal}
        {this.state.button}
        {this.state.movies}
      </div>
    );
  }
}

export default Movies;
