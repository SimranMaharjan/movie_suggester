import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const SingleMovie = (props) => {
  return (
    <>
      <Col key={props.data.id}>
        <Card style={{ width: "18rem", minHeight: "740px" }}>
          <Card.Img
            variant="top"
            src={props.data.image}
            alt="Movie cover"
            style={{ maxWidthidth: "260px" }}
          />
          <Card.Body>
            <Card.Title>{props.data.name} </Card.Title>
            <Card.Text>{props.data.info}</Card.Text>
            <Link to={`/views/${props.data.id}`}>
              <Button variant="dark">View Details</Button>
            </Link>
          </Card.Body>
        </Card>

        {/* <div >
        <Link to={`/views/${props.data.id}`}>
          <span style={{ fontWeight: "bold" }}> {props.data.name} </span>
        </Link>
        <br />
        <img
          src={props.data.image}
          alt="Movie cover"
          style={{ height: "200px" }}
        />
        <br />
        Info: 
        <br />
        Rating: {props.data.rating}
        <br />
        <br />
        <br />
      </div> */}
      </Col>
    </>
  );
};
export default SingleMovie;
