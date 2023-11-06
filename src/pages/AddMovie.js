import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useRef } from "react";
import MovieNavbar from "../components/MovieNavbar";
import { Button, Container, Form } from "react-bootstrap";

const AddMovie = () => {
  const history = useHistory();
  const movie_name_reference = useRef();
  const rating_reference = useRef();
  const description_reference = useRef();

  const addMovieHandler = async (e) => {
    e.preventDefault();

    const movieData = {
      movie_name: movie_name_reference.current.value,
      rating: rating_reference.current.value,
      description: description_reference.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        {
          timeout: 10000,
        }
      );

      alert(response.data.message);
      history.replace("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occured!");
      }
    }
  };

  return (
    <>
      <MovieNavbar />
      <Container>
        <form onSubmit={addMovieHandler}>
          <br />
          <Form.Group className="mb-3">
            <Form.Label>Movie Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Movie Name"
              ref={movie_name_reference}
              autoComplete={false}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> Rating:</Form.Label>
            <Form.Control
              type="number"
              ref={rating_reference}
              autoComplete={false}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              ref={description_reference}
              style={{ height: "100px" }}
              autoComplete={false}
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            Add Movie
          </Button>
        </form>
      </Container>
    </>
  );
};

export default AddMovie;
