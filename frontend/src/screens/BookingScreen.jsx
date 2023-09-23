import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 

const BookingScreen = () => {
  const [bookings, setBookings] = useState([]);

  const { userInfo } = useSelector((state) => state.auth); 

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`/api/users/allBookings/${userInfo._id}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Function to format a date to 'YYYY-MM-DD' format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="car-list">
      <div className="car-header">
        <div className="car-type">Car Name</div>
        <div className="cars">Pickup Point</div>
        <div className="rent-day">Pickup Date</div>
        <div className="extra-rent">Dropoff Point</div>
        <div className="extra-rent">Dropoff Date</div>
        <div className="extra-rent">Total Amount</div>
        <div className="extra-rent">Advance Amount</div>
      </div>
      {bookings.map((booking) => (
        <div className="car-item" key={booking._id}>
          <div className="car-type">{booking.carName}</div>
          <div className="cars">{booking.pickupPoint}</div>
          <div className="rent-day">{formatDate(booking.pickupDate)}</div>
          <div className="extra-rent">{booking.dropoffPoint}</div>
          <div className="extra-rent">{formatDate(booking.dropoffDate)}</div>
          <div className="extra-rent">{booking.totalPrice}</div>
          <div className="extra-rent">{booking.advanceAmount}</div>
        </div>
      ))}
    </div>
  );
};

export default BookingScreen;
