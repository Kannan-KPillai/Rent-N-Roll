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

            <h2 className="section__title become__driver-title" style={{ fontFamily: 'Mina, sans-serif', textAlign: 'center', color: 'white'}}>
              Do You Want to Earn With Us? So Don't Be Late
            </h2>

            <button className="btn become__driver-btn mt-4" onClick={handleButtonClick}>
              Rent Your Car
            </button>
        </Row>
      </Container>
    </section>
  )
}

export default EarnWithUs
