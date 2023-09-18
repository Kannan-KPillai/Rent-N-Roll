import {Col} from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from "axios";
import './styles/CarList.css'

const CarListScreen = () => {
  
  const [cars, setCars] = useState([]);
  
  const storedData = localStorage.getItem('booking');
  const bookingData = JSON.parse(storedData);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/users/getCars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars', error);
      }
    };

    fetchCars(); // Don't forget to call the fetchCars function
  }, []);

  return (

   <div>
  <div style={{ background: 'rgba(0, 0, 0, 0.6)', height: '18rem', padding: '1rem', color: 'white' }}>
  <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Pickup Information</h2>
  <div style={{ marginBottom: '1rem' }}>
    <strong>Pickup Point:</strong> {bookingData ? bookingData.pickupPoint : ''}
  </div>
  <div style={{ marginBottom: '1rem' }}>
    <strong>Date:</strong> {bookingData ? bookingData.pickupDate : ''}
  </div>
  <div style={{ marginBottom: '1rem' }}>
    <strong>Time:</strong> {bookingData ? bookingData.pickupTime : ''}
  </div>

  <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Drop-off Information</h2>
  <div style={{ marginBottom: '1rem' }}>
    <strong>Drop-off Point:</strong> {bookingData ? bookingData.dropoffPoint : ''}
  </div>
  <div style={{ marginBottom: '1rem' }}>
    <strong>Date:</strong> {bookingData ? bookingData.dropoffDate : ''}
  </div>
</div>


    <div style={{ display: 'flex', flexWrap: 'wrap', paddingTop:'2rem', paddingLeft:'2rem' }}>
  {cars.map((car) => (
    <Col lg="4" md="4" sm="6" className="mb-5" key={car._id} style={{width: '24rem'}}>
      <div className="car__item">
        <div className="car__img">
          <img
            src={`http://localhost:5000/uploads/${car.image}`}
            alt={car.name}
            className="w-100"
          />
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
              <i className="ri-timer-flash-line"></i> {car.extraRent} /extra Km
            </span>
          </div>

          <button className=" w-50 car__item-btn car__btn-rent">RENT</button>
          <button className=" w-50 car__item-btn car__btn-details">DETAILS </button>
        </div>
      </div>
    </Col>
  ))}
</div>
</div>

  );
};

export default CarListScreen;