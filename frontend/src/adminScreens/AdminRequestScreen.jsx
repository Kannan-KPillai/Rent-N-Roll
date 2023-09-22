import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";

const AdminRequestScreen = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("/api/admin/getCars");
        setCars(response.data.map((car) => ({ ...car, showButtons: true })));
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  const handleApprove = async (carId, index) => {
    try {
      const response = await axios.put(`/api/admin/acceptCar?carId=${carId}`);

      if (response.status === 200) {
        Swal.fire({
          title: "Car Approved!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        });

        // Update the showButtons property for the approved car to hide the buttons
        const updatedCars = [...cars];
        updatedCars[index].showButtons = false;
        setCars(updatedCars);
      } else {
        console.error("Error approving car: Unexpected response status");
      }
    } catch (error) {
      console.error("Error approving car:", error);
    }
  };

  const handleReject = async (carId, index) => {
    try {
      const response = await axios.put(`/api/admin/rejectCar?carId=${carId}`);

      if (response.status === 200) {
        Swal.fire({
          title: "Car Rejected",
          text: "This car has been rejected.",
          icon: "error",
          confirmButtonText: "OK",
        });

        // Update the showButtons property for the rejected car to hide the buttons
        const updatedCars = [...cars];
        updatedCars[index].showButtons = false;
        setCars(updatedCars);
      } else {
        console.error("Error rejecting car: Unexpected response status");
      }
    } catch (error) {
      console.error("Error rejecting car:", error);
    }
  };

  const headerStyle = {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Sidebar />
      <div
        style={{
          paddingTop: "5rem",
          paddingLeft: "5rem",
          paddingRight: "5rem",
          width: "97%",
          backgroundColor: "rgba(53, 55, 67, 1)",
          paddingBottom: "3rem",
          overflowY: "scroll",
        }}
      >
        <Card>
          <Card.Body>
            <h2 style={headerStyle}>Car Management</h2>
            {cars.length === 0 ? (
              <h1
                style={{
                  color: "black",
                  textAlign: "center",
                  fontWeight: "bold",
                  paddingTop: "10rem",
                }}
              >
                No New Requests
              </h1>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Owner Name</th>
                    <th>Mobile</th>
                    <th>Car Name</th>
                    <th>Year</th>
                    <th>Transmission</th>
                    <th>Fuel</th>
                    <th>Document</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map(
                    (car, index) =>
                      // Conditionally render the row based on showButtons
                      car.showButtons && (
                        <tr key={car._id}>
                          <td>{index + 1}</td>
                          <td>{car.owner ? car.owner.name : "N/A"}</td>
                          <td>{car.owner ? car.owner.mobile : "N/A"}</td>
                          <td>{car.name}</td>
                          <td>{car.year}</td>
                          <td>{car.transmission}</td>
                          <td>{car.fuel}</td>
                          <td>
                            <a
                              href={car.document.url} // Use the Cloudinary URL
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={car.document.url} // Use the Cloudinary URL
                                alt="Car Document"
                                style={{
                                  maxWidth: "100px",
                                  maxHeight: "100px",
                                  cursor: "pointer",
                                }}
                              />
                            </a>
                          </td>
                          <td>
                            <>
                              <button
                                style={{
                                  backgroundColor: "green",
                                  color: "white",
                                  marginRight: "5px",
                                  width: "100px",
                                  height: "30px",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleApprove(car._id, index)}
                              >
                                Accept
                              </button>
                              <button
                                style={{
                                  backgroundColor: "red",
                                  color: "white",
                                  width: "100px",
                                  height: "30px",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleReject(car._id, index)}
                              >
                                Reject
                              </button>
                            </>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AdminRequestScreen;
