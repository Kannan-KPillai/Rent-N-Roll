import React, { useState, useEffect } from "react"; 
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings"; 

const UserReview = () => {
  const { id } = useParams();
  const [car, setCar] = useState({}); 
  const [ratingsAndReviews, setRatingsAndReviews] = useState([]); 


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (id) {
          const response = await axios.get(`/api/users/carReview/${id}`, {
            withCredentials: true,
          });
          setCar(response.data.car);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    const fetchRatingsAndReviews = async () => {
      try {
        const response = await axios.get(`/api/users/reviews/${id}`);
        setRatingsAndReviews(response.data); 
      } catch (error) {
        console.error("Error fetching ratings and reviews:", error);
      }
    };

    fetchDetails();
    fetchRatingsAndReviews();
  }, [id]); 

  return (
    <div className="d-flex align-items-center " style={{paddingLeft:'22rem'}}>
      <Container
        style={{
            paddingTop:'2rem',paddingLeft: "7rem",
          borderRadius: "1rem",
          paddingBottom: "2rem", }}>
        <Row>
          <Col lg="5" style={{ background: "white", width:'40rem' }}>
            <img src={car.image?.url} alt={car.name} className="w-100" />
            <div className="d-flex align-items-center mt-3" style={{ columnGap: "4rem" }}>
              <span className="d-flex align-items-center gap-1 section__description">
                <i className="ri-roadster-line" style={{ color: "#f9a826" }}></i>{" "}
                <strong>{car.name}</strong>
              </span>
              <span className="d-flex align-items-center gap-1 section__description">
                <i className="ri-settings-2-line" style={{ color: "#f9a826" }}></i>{" "}
                <strong>{car.fuel}</strong>
              </span>
              <span className="d-flex align-items-center gap-1 section__description">
                  <i
                    class="ri-timer-flash-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  <strong>₹ {car.transmission} </strong>
                </span>
            </div>

            <div className="ratings-container align-items-center" style={{paddingLeft: '5rem'}}>
              <h1
                style={{
                  textAlign: "center",
                  color: "black",
                  fontSize: "30px",
                  paddingTop: "1rem",
                }}
              >
                User Experiences
              </h1>
              {ratingsAndReviews.map((review, index) => (
                <div key={index} className="rating-item">
                  <h5 style={{ color: "black" }}>{review.userId.name}</h5>
                  <StarRatings
                    rating={review.rating}
                    starDimension="30px"
                    starRatedColor="#f9a826"
                    numberOfStars={5}
                    name={`rating-${index}`}
                  />
                  <p style={{ color: "black" }}>{review.review}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserReview;
     