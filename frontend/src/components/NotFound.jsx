import { Container, Row, Col } from "react-bootstrap";
   

const NotFound = () => {
  return (
    <Container>
    <Row className="mt-5" style={{height: '690px'}}>
      <Col md={6} className="mx-auto text-center">
        <h1 className="display-4">404 - Not Found</h1>
        <p className="lead">
          The page you are looking for could not be found.
        </p>

      </Col>
    </Row>
  </Container>
);
};


export default NotFound
