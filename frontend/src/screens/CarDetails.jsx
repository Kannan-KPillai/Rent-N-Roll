import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import "./styles/CarList.css";
import { useSelector } from "react-redux";
import {loadStripe} from '@stripe/stripe-js'
import { toast } from "react-toastify";



const CarDetails = () => {
  const pKey = 'pk_test_51Nt66mSHgmItS963HCAKMYVjghgP5cn42RTbiGNmcMDC6LP5b2bMEGGZh0f3QtdiGQA7ylJ6EF1MJhxTZsg1Nvin00XUPMobdG';

  const { id } = useParams();
  const [car, setCar] = useState({});
  const storedData = localStorage.getItem("booking");
  const bookingData = JSON.parse(storedData);

  const { userInfo } = useSelector((state) => state.auth);

  // Calculate the number of days between pickup and dropoff dates
  const pickupDate = bookingData ? new Date(bookingData.pickupDate) : null;
  const dropoffDate = bookingData ? new Date(bookingData.dropoffDate) : null;
  const numberOfDays =
    pickupDate && dropoffDate
      ? Math.ceil((dropoffDate - pickupDate) / (1000 * 60 * 60 * 24))
      : 0;

  const totalRate = car.rent * numberOfDays;
  const advanceAmount = (20 / 100) * totalRate;

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

  const handlePayNowClick = () => {
    const bookingDetails = {
      carId: id,
      carName: car.name,
      pickupPoint: bookingData ? bookingData.pickupPoint : "",
      dropoffPoint: bookingData ? bookingData.dropoffPoint : "",
      pickupDate: bookingData ? bookingData.pickupDate : "",
      dropoffDate: bookingData ? bookingData.dropoffDate : "",
      pickupTime: bookingData ? bookingData.pickupTime : "",
      totalPrice: totalRate,
      advanceAmount: advanceAmount,
      userId: userInfo._id,
      ownerId: car.owner,
    };

    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    localStorage.removeItem("booking");
    payment();
  };

  async function payment() {
    const stripe = await loadStripe(pKey);

    const { data } = await axios.post("/api/users/payment", {
      name: car.name,
      price: advanceAmount,
      car: car._id,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });
    if (result?.error) {
      toast.error(result.error);
    }
  }



  return (
    <section>
      <div style={{ height: "45rem" }}>
        <Container
          style={{
            paddingTop: "5rem",
            paddingLeft: "7rem",
            borderRadius: "1rem",
          }}
        >
          <Row>
            <Col lg="5" style={{ background: "white" }}>
              <img src={car.image?.url} alt={car.name} className="w-100" />
              <div
                className="d-flex align-items-center mt-3"
                style={{ columnGap: "4rem" }}
              >
                <span className="d-flex align-items-center gap-1 section__description">
                  <i class="ri-roadster-line" style={{ color: "#f9a826" }}></i>{" "}
                  <strong>{car.transmission}</strong>
                </span>

                <span className="d-flex align-items-center gap-1 section__description">
                  <i
                    class="ri-settings-2-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  <strong>{car.fuel}</strong>
                </span>

                <span className="d-flex align-items-center gap-1 section__description">
                  <i
                    class="ri-timer-flash-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  <strong>₹ {car.extraRent} /extra Km</strong>
                </span>
              </div>
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{car.name}</h2>

                <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-2">₹{totalRate}</h6>
                  <h4 className="days  fs-4">Total days: {numberOfDays}</h4>
                </div>

                <div className="d-flex align-items-center mt-3">
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-map-pin-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    <strong>
                      Pickup Point: {bookingData ? bookingData.pickupPoint : ""}
                    </strong>
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-map-pin-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    <strong>
                      Dropoff Point:{" "}
                      {bookingData ? bookingData.dropoffPoint : ""}
                    </strong>
                  </span>
                </div>

                <div
                  style={{
                    columnGap: "4rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    className="section__description"
                    style={{ margin: "0", fontWeight: "bold" }}
                  >
                    <i
                      className="ri-calendar-line"
                      style={{ color: "#f9a826" }}
                    ></i>
                    Pickup date: {bookingData ? bookingData.pickupDate : ""}
                  </div>

                  <div
                    className="section__description"
                    style={{ fontWeight: "bold" }}
                  >
                    <i
                      className="ri-calendar-line"
                      style={{ color: "#f9a826" }}
                    ></i>
                    Dropoff date: {bookingData ? bookingData.dropoffDate : ""}
                  </div>
                </div>

                <div className="mt-3 fs-4">
                  <strong>Advance amount: ₹{advanceAmount}</strong>
                  <button
                    className="pay__now"
                    style={{ display: "inline-block", marginLeft: "6rem" }}
                    onClick={handlePayNowClick}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </Col>
            <h6 style={{color: 'red', paddingTop: '1rem'}}> * For every booking, an advance payment of 20% of
        the total rental cost is required. Please note that this advance
        payment is <strong>non-refundable</strong></h6>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default CarDetails;
