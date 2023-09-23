import "./styles/HomeScreen.css";
import { useEffect } from "react";
import axios from "axios";



const BookingSuccess = () => {
  const storedData = localStorage.getItem("bookingDetails");
  const bookingData = JSON.parse(storedData);

  useEffect(() => {
    if (bookingData) {
      const data = {
        carId: bookingData.carId,
        pickupPoint: bookingData.pickupPoint,
        dropoffPoint: bookingData.dropoffPoint,
        pickupDate: bookingData.pickupDate,
        dropoffDate: bookingData.dropoffDate,
        totalPrice: bookingData.totalPrice,
        pickupTime: bookingData.pickupTime,
        advanceAmount: bookingData.advanceAmount,
        userId: bookingData.userId,
        ownerId: bookingData.ownerId
      };
      axios.post("/api/users/bookingDetails", data).then((response) => {     
        localStorage.removeItem("bookingDetails");
           console.log("Booking details sent successfully");
        })
        .catch((error) => {
          console.error("Error sending booking details:", error);
        });
    }
  }, [bookingData]);

  return (
    <div style={{ height: "42rem", display: "flex", justifyContent: "center" }}>
      <div className="main-container">
        <div className="check-container">
          <div className="check-background">
            <svg
              viewBox="0 0 65 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 25L27.3077 44L58.5 7"
                stroke="white"
                strokeWidth="13"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="check-shadow"></div>
        </div>
        <h1
          style={{
            color: "red",
            fontFamily: "Bangers, sans-serif",
            textShadow: "2px 2px 4px white", // Add white stroke
            fontSize: "3rem", // Increase the font size
          }}
        >
          YOUR BOOKING HAS BEEN CONFIRMED
        </h1>

        {/* <Link to={'/history'}>Bookigs</Link> */}
      </div>
    </div>
  );
};

export default BookingSuccess;
