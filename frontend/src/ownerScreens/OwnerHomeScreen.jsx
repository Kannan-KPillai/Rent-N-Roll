import "./styles/OwnerHomeScreen.css";
import { useNavigate } from "react-router-dom";

function OwnerHomeScreen() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
      window.scrollTo({
        top: 0,             
        behavior: 'smooth'  
      });
    navigate("/owner/addcar");
  };

  return (
    <div>
      <div className="OwnerHomeScreen">
        <div className="ownertext">
          <h1 style={{ color: "black", textShadow: "2px 2px 0 white", fontFamily: 'Carter One sans-serif', fontWeight:'bolder', fontSize: '3rem' }}>
            Earn While You Rest: Let Your Car Pay Its Own Bills with Us!
          </h1>
          <h3
            style={{
              color: "black",
              textShadow: "2px 2px 0 white",
              paddingLeft: "4rem",
              paddingRight: "4rem",
              paddingTop: "2rem",
            }}
          >
            Turn your car into a source of income that continues to give back.
            Experience the benefits of sharing while ensuring your car remains a
            valued part of your life. Together, let's revolutionize the way we
            view car ownership!
          </h3>
        </div>
      </div>
      <div className="how-it-works">
 
        <h1 style={{ color: "black", fontFamily: "Teko", paddingTop:'3rem'}}>HOW IT WORKS?</h1>

        <h3 style={{ padding: "4rem", color: "black" }}>
          At RENT <span className="red-letter">N</span> ROLL, we understand that
          your car is more than just a mode of transportation - it's an asset
          with untapped potential. Whether you're a seasoned entrepreneur or a
          first-time car owner looking to make the most of your investment, our
          platform is designed to offer you
        </h3>
      
        <button className="btn001" onClick={handleButtonClick}>
          REGISTER YOUR CAR HERE
        </button>
        <h3
          style={{ color: "black", paddingTop: "4rem", paddingBottom: "1rem" }}
        >
          Car categories and Pricing{" "}
        </h3>
        <div class="car-list">
  <div class="car-header">
    <div class="car-type">CAR TYPE</div>
    <div class="cars">CARS</div>
    <div class="rent-day">RENT PER DAY</div>
    <div class="extra-rent">EXTRA RENT/KM</div>
  </div>
  <div class="car-item">
    <div class="car-type">HatchBack</div>
    <div class="cars">Swift, i20, S-presso, Polo, Baleno, Wagon R, Altroz, Tiago ..etc</div>
    <div class="rent-day">₹ 1800</div>
    <div class="extra-rent">₹ 9/km</div>
  </div>
  <div class="car-item">
    <div class="car-type">Sedan</div>
    <div class="cars">Dzire, Tigor, City, Aura, Slavia, Virtus, Amaze ..etc</div>
    <div class="rent-day">₹ 2100</div>
    <div class="extra-rent">₹ 12/km</div>
  </div>
  <div class="car-item">
    <div class="car-type">Compact SUV</div>
    <div class="cars">Brezza, XUV300, Venue, Kiger, Sonet, Magnite, Fronx ..etc</div>
    <div class="rent-day">₹ 2200</div>
    <div class="extra-rent">₹ 13/km</div>
  </div>
  <div class="car-item">
    <div class="car-type"> SUV</div>
    <div class="cars">Seltos, Thar, Exter, Bolero, Creta, Nexon ..etc</div>
    <div class="rent-day">₹ 2400</div>
    <div class="extra-rent">₹ 14/km</div>
  </div>
  <div class="car-item">
    <div class="car-type"> MUV</div>
    <div class="cars">Innova, Carens, Crysta, Triber, XL6, Invicto, Marazzo, Ertiga..etc</div>
    <div class="rent-day">₹ 2800</div>
    <div class="extra-rent">₹ 16/km</div>
  </div>
</div>
      </div>
    </div>
  );
}

export default OwnerHomeScreen;
