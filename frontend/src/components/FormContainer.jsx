import { Container,Row,Col } from "react-bootstrap"

const FormContainer = ({children}) =>{
  return (
   <Container >
    <Row className="justify-content-md-center mt-5">
        <Col xs={8} md={6} className="card p-3">
            {children}
        </Col>
    </Row>
   </Container>
  )
}

export default FormContainer;
