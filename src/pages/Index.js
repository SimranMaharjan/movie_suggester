import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import MovieNavbar from "../components/MovieNavbar";
import SingleMovie from "../components/SingleMovie";
import { Container, Form, Row, Spinner } from "react-bootstrap";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [searchMovieText, setsearchMovieText] = useState("");
  const [searchErrorText, setsearchErrorText] = useState("");
  const [isError, setisError] = useState(false);
  const [errorText, seterrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (!firstRun) {
      const fetchTimer = setTimeout(() => {
        if (searchMovieText && searchMovieText.length > 2) {
          fetchMovies();
        } else if (searchMovieText.length < 1) {
          fetchMovies();
        } else {
          setsearchErrorText(
            "Please enter at least 3 characters for searching"
          );
        }
      }, 500);

      return () => {
        clearTimeout(fetchTimer);
      };
    }
  }, [searchMovieText]);

  const fetchMovies = async () => {
    setLoading(true);
    setsearchErrorText("");
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovieText}`
      );
      setMovies(response.data.moviesData);
      setisError(false);
      setLoading(false);
      setFirstRun(false);
    } catch (error) {
      setisError(true);
      seterrorText("Cannot provide movie info!");
      setLoading(false);
      setFirstRun(false);
    }

    console.log(movies);
  };

  return (
    <>
      <div className="App">
        <MovieNavbar />
        <div className="text-center mt-3">
          <Container>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={searchMovieText}
                placeholder="Type movie name for searching!"
                onChange={(e) => setsearchMovieText(e.target.value)}
              />
            </Form.Group>
          </Container>
        </div>

        <span style={{ color: "red" }}>{searchErrorText}</span>

        {isError ? (
          <>
            <div style={{ background: "red", margin: "10px", padding: "10px" }}>
              {errorText}
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                background: "#e7e7e7",
                padding: "10px",
                margin: "5px",
                border: "10px",
              }}
            >
              <div>
                {loading ? (
                  <>
                    <Container className="text-center">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </Container>
                  </>
                ) : (
                  <></>
                )}
              </div>

              {!loading && movies.length < 1 ? (
                <>No movie found!</>
              ) : (
                <>
                  <Row>
                    {movies.map((el) => (
                      <SingleMovie data={el} />
                    ))}
                  </Row>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Index;
