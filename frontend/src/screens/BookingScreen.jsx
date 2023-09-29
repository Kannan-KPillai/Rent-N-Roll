import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import data from "./data/data.json";
import Lottie from "lottie-react";

const BookingScreen = () => {
  const [bookings, setBookings] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);
  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `/api/users/allBookings/${userInfo._id|| userInfo.data._id}`
      );
        setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axios.post(`/api/users/cancel/${bookingId}`);
      fetchBookings();
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isBookingCompleted = (dropoffDate) => {
    const formattedDropoffDate = new Date(dropoffDate);
    const currentDate = new Date();
    return currentDate > formattedDropoffDate;
  };

  return (
    <div className="car-list" style={{ minHeight: "38rem" }}>
      {bookings.length === 0 ? (
        <div
          style={{
            height: "40rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Lottie animationData={data} />
          <div
            style={{
              marginTop: "1rem",
              textAlign: "center",
              paddingBottom: "3rem",
            }}
          >
            <h1 style={{ fontFamily: "Mina, sans-serif", color: "black" }}>
              NO BOOKINGS YET
            </h1>
          </div>
        </div>
      ) : (
        <div className="car-header">
          <div className="car-type">Car Name</div>
          <div className="cars">Pickup Point</div>
          <div className="rent-day">Pickup Date</div>
          <div className="extra-rent">Dropoff Point</div>
          <div className="extra-rent">Dropoff Date</div>
          <div className="extra-rent">Total Amount</div>
          <div className="extra-rent">Advance Amount</div>
          <div className="extra-rent">Status</div>
        </div>
      )}
      {bookings.map((booking) => (
        <div className="car-item" style={{ color: "white" }} key={booking._id}>
          <div className="car-type">{booking.carName}</div>
          <div className="cars">{booking.pickupPoint}</div>
          <div className="rent-day">{formatDate(booking.pickupDate)}</div>
          <div className="extra-rent">{booking.dropoffPoint}</div>
          <div className="extra-rent">{formatDate(booking.dropoffDate)}</div>
          <div className="extra-rent">{booking.totalPrice}</div>
          <div className="extra-rent">{booking.advanceAmount}</div>
          <div className="extra-rent">
            {isBookingCompleted(booking.dropoffDate) ? (
              <p style={{ color: "green" }}>Completed</p>
            ) : booking.cancelBooking ? (
              <p style={{ color: "red" }}>Cancelled</p>
            ) : (
              <button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                }}
                onClick={() => handleCancelBooking(booking._id)}
                disabled={booking.cancelBooking} // Disable the button if already cancelled
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingScreen;
