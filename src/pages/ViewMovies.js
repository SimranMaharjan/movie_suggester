import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import MovieNavbar from "../components/MovieNavbar";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ViewMovies = () => {
  const getParams = useParams();
  console.log(getParams);
  const getID = getParams.id;

  const [movieData, setmovieData] = useState({});

  const getSingleMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getID}`
      );
      setmovieData(response.data.singleMovieData);
    } catch (error) {
      alert("Error Occurred!");
    }
  };

  useEffect(() => {
    getSingleMovie();
  }, []);

  return (
    <>
      <MovieNavbar />
      <Container>
        <h1 className="text-info">{movieData.name}</h1> <br />
        <Card>
          <Card.Body>Movie Info:{movieData.info}</Card.Body>
        </Card>
        <br />
        <br />
        <Card>
          <Card.Body>Description:{movieData.desc}</Card.Body>
        </Card>
        <br />
        <br />
        <Card>
          <Card.Body>
            Image:
            <br />
            <img
              src={movieData.image}
              alt="Movie cover"
              style={{ height: "200px" }}
            />
          </Card.Body>
        </Card>
        <br />
        <br />
        <Card>
          <Card.Body> Rating:{movieData.rating}</Card.Body>
        </Card>
        <br />
        <br />
        <Link to="/">
          <Button variant="dark" type="button">
            Go back
          </Button>
        </Link>
        <br />
        <br />
      </Container>
    </>
  );
};

export default ViewMovies;
