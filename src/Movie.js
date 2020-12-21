import React, { Component } from "react";
import { Card, Row, Col, Image, Button } from "react-bootstrap";
import { API_URL } from "./settings";
import { ReactComponent as StarIcon } from "./icons/star-with-five-points.svg";
import { getUserRole } from "./authentication";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = { movie: null, title: null, button: null };
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
    console.log(`${API_URL}/movie/${this.props.match.params.id}`);

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
      console.log(responseBody);

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
          <Button className="mt-3 ml-2" variant="danger">
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

  render() {
    return (
      <div className="container">
        <h1 className="text-center mt-4 title-cutoff">{this.state.title}</h1>
        {this.state.movie}
        {this.state.button}
      </div>
    );
  }
}

export default Movie;
