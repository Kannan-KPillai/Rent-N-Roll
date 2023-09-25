import Lottie from 'lottie-react';
import axios from 'axios';
import data from '../screens/data/data.json';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 


const OwnerBookingScreen = () => {

    const [bookings, setBookings] = useState([]);
    const { ownerInfo } = useSelector((state) => state.owner);

    const fetchBookings = async () => {
        try {
          const response = await axios.get(`/api/owner/getallBookings/${ownerInfo._id}`);
          setBookings(response.data);
        } catch (error) {
          console.error('Error fetching bookings', error);
        }
      };

      useEffect(() => {
        fetchBookings();
      }, []);

      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
    


  return (
    <div className="car-list" style={{minHeight:'38rem'}}>
      {bookings.length === 0 ? (
       <div style={{ height: '40rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
       <Lottie animationData={data} />
       <div style={{ marginTop: '1rem', textAlign: 'center', paddingBottom: '3rem' }}>
         <h1 style={{ fontFamily: 'Mina, sans-serif', color: 'black' }}>NO BOOKINGS YET</h1>
       </div>
     </div>
      ) : (
        
        <div className="car-header" >
          <div className="extra-rent">User Name</div>
          <div className="cars">User Mobile</div>
          <div className="rent-day">Pickup Date</div>
          <div className="extra-rent">Pickup Point</div>
          <div className="extra-rent">Dropoff Date</div>
          <div className="extra-rent">Dropoff Point</div>       
          <div className="extra-rent">Pickup Time</div>
          {/* <div className="extra-rent">Car</div> */}
        </div>
      )}
      {bookings.map((booking) => (
        <div className="car-item" style={{color:'white'}} key={booking._id}>
          <div className="cars">{booking.userName }</div>
          <div className="extra-rent">{booking.userMobile}</div>
          <div className="rent-day">{formatDate(booking.pickupDate)}</div>
          <div className="extra-rent">{booking.pickupPoint}</div>
          <div className="extra-rent">{formatDate(booking.dropoffDate)}</div>
          <div className="extra-rent">{booking.dropoffPoint}</div>      
          <div className="extra-rent">{booking.pickupTime}</div>
          {/* <div className="extra-rent">{booking.carName}</div> */}
        </div>
      ))}
    </div>
  )
}

export default OwnerBookingScreen
