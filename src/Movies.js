import React, { Component } from "react";
import { Card, Row, Col, Image, Button } from "react-bootstrap";
import { API_URL } from "./settings";
import { Link } from "react-router-dom";
import { ReactComponent as StarIcon } from "./icons/star-with-five-points.svg";
import { getUserRole } from "./authentication";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: null, button: null };
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

      if (getUserRole() === "a") {
        let button = (
          <Button className="mb-3 ml-2" variant="primary">
            Add Movie
          </Button>
        );
        this.setState({ button: button });
      }
    } else {
      console.log("ERROR movies list");
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center mt-4 mb-3">Movies</h1>
        {this.state.button}
        {this.state.movies}
      </div>
    );
  }
}

export default Movies;
