import { Col } from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/CarList.css";
import { useNavigate } from "react-router-dom";
import car from './data/data.json'
import Lottie from 'lottie-react'


const CarListScreen = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  const storedData = localStorage.getItem("booking");
  const bookingData = JSON.parse(storedData);

  const fetchAvailableCars = async () => {
    try {
      if (bookingData) {
        const { pickupDate, dropoffDate } = bookingData;
        const response = await axios.get(
          `/api/users/getAvailableCars?pickupDate=${pickupDate}&dropoffDate=${dropoffDate}`
        );
        setCars(response.data);
      }
    } catch (error) {
      console.error("Error fetching available cars", error);
    }
  };
  useEffect(() => {
    fetchAvailableCars();
  }, []);
  
  const navigateToCarDetails = (carId) => {
    window.scrollTo({
      top: 0,             
      behavior: 'smooth'  
    });
    navigate(`/carDetails/${carId}`);
  };

  return (
    <div>
      <div className="pickup-dropoff-container">
        <div className="pickup-info">
          <h2 className="info-title">Pickup Information</h2>
          <div className="info-item">
            <strong>Pickup Point:</strong>{" "}
            {bookingData ? bookingData.pickupPoint : ""}
          </div>
          <div className="info-item">
            <strong>Date:</strong> {bookingData ? bookingData.pickupDate : ""}
          </div>
        </div>

        <div className="dropoff-info">
          <h2 className="info-title">Drop-off Information</h2>
          <div className="info-item">
            <strong>Drop-off Point:</strong>{" "}
            {bookingData ? bookingData.dropoffPoint : ""}
          </div>
          <div className="info-item">
            <strong>Date:</strong> {bookingData ? bookingData.dropoffDate : ""}
          </div>
        </div>
        <h6
          style={{
            color: "red",
            textAlign: "center",
            paddingLeft: "4rem",
            paddingRight: "4rem",
          }}
        >
          * For every vehicle category in our fleet, we offer a standard
          allowance of 150 kilometers per rental period at no additional cost.
          However, should your journey exceed this allotted distance, an excess
          kilometer charge will be applicable.
        </h6>
      </div>

      <h1 style={{ textAlign: "center", background: "grey", color: "black" }}>
        AVAILABLE CARS
      </h1>

      
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          paddingTop: "2rem",
          paddingLeft: "2rem",
        }}
      >
        {cars.length === 0 ? (
         <div style={{ textAlign: "center", width: "100%" }}>
         <div style={{ width: "30%", margin: "0 auto" }}>
           <Lottie animationData={car} />
           <h2>No cars available for the selected date.</h2>
         </div>
       </div>
        ) : (
          cars.map((car) => (
            <Col
              lg="4"
              md="4"
              sm="6"
              className="mb-5"
              key={car._id}
              style={{ width: "22rem", paddingLeft: '2.5rem'}}
            >
              <div className="car__item">
                <div className="car__img">
                  <img src={car.image.url} alt={car.name} className="w-100" />
                </div>

                <div className="car__item-content mt-4">
                  <h4 className="section__title text-center">{car.name}</h4>
                  <h6 className="rent__price text-center mt-">
                    ₹{car.rent} <span>/ Day</span>
                  </h6>

                  <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                    <span className=" d-flex align-items-center gap-1">
                      <i className="ri-car-line"></i> {car.transmission}
                    </span>
                    <span className=" d-flex align-items-center gap-1">
                      <i className="ri-settings-2-line"></i> {car.fuel}
                    </span>
                    <span className=" d-flex align-items-center gap-1">
                      <i className="ri-timer-flash-line"></i> {car.extraRent}{" "}
                      /extra Km
                    </span>
                  </div>

                  <button
                    className="w-50 car__item-btn car__btn-rent"
                    onClick={() => navigateToCarDetails(car._id)}
                  >
                    RENT
                  </button>
                  <button
                    className="w-50 car__item-btn car__btn-details"
                    onClick={() => navigateToCarDetails(car._id)}
                  >
                    DETAILS
                  </button>
                </div>
              </div>
            </Col>
          ))
        )}
      </div>
    </div>
  );
};

export default CarListScreen;
