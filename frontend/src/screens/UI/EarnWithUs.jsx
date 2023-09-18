import '../styles/HomeScreen.css';
import { Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector} from 'react-redux';


const EarnWithUs = () => {

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const handleButtonClick = () => {
   
    if(!userInfo){
    navigate('/owner/register')
    }else{
      toast.error('Please logout to continue.');
    }
  }

  return (
    <section className="become__driver">
      <Container>
        <Row>   
          {/* <Col lg="6" md="6" sm="12"> */}
            <h2 className="section__title become__driver-title">
              Do You Want to Earn With Us? So Don't Be Late
            </h2>

            <button className="btn become__driver-btn mt-4" onClick={handleButtonClick}>
              Rent Your Car
            </button>
          {/* </Col> */}
        </Row>
      </Container>
    </section>
  )
}

export default EarnWithUs
