import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import './styles/CarList.css';


const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const storedData = localStorage.getItem("booking");
  const bookingData = JSON.parse(storedData);


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (id) {
          const response = await axios.get(`/api/users/carDetails/${id}`);
          setCar(response.data.car);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
  
    fetchDetails();
  }, [id]);
  

  // Render car details
  return (
    <section>
        <div style={{height:'35rem'}}>
      <Container style={{paddingTop:'5rem', paddingLeft:'7rem', borderRadius:'1rem'}}>
        <Row>
          <Col lg="5" style={{background: 'white'}}>
            <img src={car.image?.url} alt={car.name} className="w-100" />
          </Col>

          <Col lg="6">
            <div className="car__info">
              <h2 className="section__title">{car.name}</h2>

              <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                <h6 className="rent__price fw-bold fs-2">
                  ₹{car.rent} <span>/ Day</span>
                </h6>
               
              </div>
              <div className="d-flex align-items-center mt-3">
  <span className="d-flex align-items-center gap-1 section__description">
    <i className="ri-roadster-line" style={{ color: "#f9a826" }}></i>{" "}
    <strong>Pickup Point:</strong> {bookingData ? bookingData.pickupPoint : ""}
  </span>

  <span className="d-flex align-items-center gap-1 section__description">
    <i className="ri-settings-2-line" style={{ color: "#f9a826" }}></i>{" "}
    <strong>Dropoff Point:</strong> {bookingData ? bookingData.dropoffPoint : ""}
  </span>
</div>

             

              <div className="d-flex align-items-center mt-3" style={{ columnGap: "4rem" }}>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i class="ri-roadster-line" style={{ color: "#f9a826" }}></i> {car.transmission}
                </span>

                <span className="d-flex align-items-center gap-1 section__description">
                  <i class="ri-settings-2-line" style={{ color: "#f9a826" }}></i> {car.fuel}
                </span>

                <span className="d-flex align-items-center gap-1 section__description">
                  <i class="ri-timer-flash-line" style={{ color: "#f9a826" }}></i> {car.extraRent} /extra Km
                </span>
              </div>

              <div className="d-flex align-items-center mt-3" style={{ columnGap: "2.8rem" }}>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      </div>
    </section>
  );
};

export default CarDetails;
