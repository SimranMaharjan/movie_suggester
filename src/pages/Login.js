import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
import MovieNavbar from "../components/MovieNavbar";
import { Button, Container, Form, Modal } from "react-bootstrap";

const Login = () => {
  const history = useHistory();
  const [modalShown, setModalShown] = useState(false);
  const [modalText, setModalText] = useState("");
  const email = useRef();
  const password = useRef();

  const logoutHandler = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData,
        {
          timeout: 10000,
        }
      );

      //alert(response.data.message);
      const getAccesToken = response.data.accessToken;
      localStorage.setItem("accessToken", getAccesToken);
      if (response.data.status === "success") {
        // alert("Logged in succesfully!");
        setModalText("Logged in succesfully!");
        setModalShown(true);
      }

      setTimeout(() => {
        history.replace("/");
      }, 1000);
    } catch (error) {
      try {
        if (error.response) {
          setModalShown(true);
          setModalText(error.response.data.errors[0].message);
        } else {
          // alert("Unknown error occured!");
          setModalText("Unknown error occured!");
          setModalShown(true);
        }
      } catch (errors) {
        // alert("Unknown error occured!");
        setModalText("Unknown error occured!");
        setModalShown(true);
      }
    }
  };
  return (
    <>
      <MovieNavbar />
      <Container>
        <h5>Login:</h5>
        <form onSubmit={logoutHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={email}
              autoComplete={false}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={password} autoComplete={false} />
          </Form.Group>
          <Button variant="dark" type="submit">
            Login
          </Button>
        </form>
      </Container>

      <Modal
        show={modalShown}
        onHide={() => {
          setModalShown(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => {
              setModalShown(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
