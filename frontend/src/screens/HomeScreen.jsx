import FindCarForm from "./UI/FindCarForm";
import HeroSlider from "./UI/HeroSlider";
import { Container, Row, Col } from "reactstrap";
import ServicesList from "./UI/ServicesList";
import EarnWithUs from "./UI/EarnWithUs";





const HomeScreen = () => {
 
 

  return (
    <section className="p-0 hero__slider-section">
       <HeroSlider/>
       <div className="hero__form">
        <FindCarForm/>
       </div>
       <div >
       <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
            <h2 className="section__title">WHY RENT <span style={{ color: 'red' }}>N</span> ROLL ?</h2>
            </Col>
            <ServicesList />
          </Row>
        </Container>
        <EarnWithUs/> 
       </div>
       </section>
  );
};

export default HomeScreen;
