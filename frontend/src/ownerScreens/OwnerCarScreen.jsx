import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const OwnerCarScreen = () => {
  const [cars, setCars] = useState([]);
  const { ownerInfo } = useSelector((state) => state.owner);

  useEffect(() => {
    const fetchCarsByOwner = async () => {
      try {
        const response = await axios.get(`/api/owner/getCar/${ownerInfo._id}`, {withCredentials: true });
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCarsByOwner();
  }, [ownerInfo._id]);

  const handleTurnOnOff = async (carId, isAvailable) => {
    try {
      if (isAvailable) {
        await axios.put(`/api/owner/cars/turnoff/${carId}`);
      } else {
        await axios.put(`/api/owner/cars/turnon/${carId}`);
      }

      setCars((prevCars) =>
        prevCars.map((car) =>
          car._id === carId ? { ...car, isAvailable: !isAvailable } : car
        )
      );
    } catch (error) {
      console.error("Error turning on/off car:", error);
    }
  };

  return (
    <div className="car-list" style={{ minHeight: "38rem" }}>
      <div className="car-header">
        <div className="extra-rent">Image</div>
        <div className="cars">Car</div>
        <div className="rent-day">Transmission</div>
        <div className="extra-rent">Fuel Type</div>
        <div className="extra-rent">Rent</div>
        <div className="extra-rent">Extra Rent</div>
        <div className="extra-rent">Option</div>
      </div>

      {cars.map((car) => (
        <div className="car-item" style={{ color: "white" }} key={car._id}>
          <div className="extra-rent">
            <img
              src={car.image.url}
              alt={car.name}
              style={{ maxWidth: "100px" }}
            />
          </div>
          <div className="cars">{car.name}</div>
          <div className="rent-day">{car.transmission}</div>
          <div className="extra-rent">{car.fuel}</div>
          <div className="extra-rent">{car.rent}</div>
          <div className="extra-rent">{car.extraRent}</div>
          <div className="extra-rent">
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: car.isAvailable ? "red" : "green",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onClick={() => handleTurnOnOff(car._id, car.isAvailable)}
            >
              {car.isAvailable ? "Turn Off Car" : "Turn On Car"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OwnerCarScreen;
