import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieNavbar from "../components/MovieNavbar";
import { Button, Container, Modal } from "react-bootstrap";

const Profile = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [modalShown, setModalShown] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const getAccessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",

        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        }
      );

      setUserData(response.data.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occured!");
      }
    }
  };
  const onLogout = () => {
    setModalShown(true);
  };
  return (
    <>
      <MovieNavbar />
      <Container>
        Name:{userData.name}
        <br />
        Email:{userData.email}
        <br />
        Country:{userData.country}
        <br />
        <br />
        <Button type="button" onClick={onLogout} variant="danger">
          Logout
        </Button>
      </Container>

      <Modal
        show={modalShown}
        onHide={() => {
          setModalShown(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => {
              setModalShown(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem("accessToken");
              history.push("/");
            }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Profile;
