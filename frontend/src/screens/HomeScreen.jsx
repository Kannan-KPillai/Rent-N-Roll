import FindCarForm from "./UI/FindCarForm";
import HeroSlider from "./UI/HeroSlider";
import { Container, Row, Col } from "reactstrap";


const HomeScreen = () => {
 
  return (
    <section className="p-0 hero__slider-section">
       <HeroSlider/>
       <div className="hero__form">
        <FindCarForm/>
       </div>
       </section>
  );
};

export default HomeScreen;
