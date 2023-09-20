import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table } from "react-bootstrap";
import Sidebar from "../components/Sidebar";

const AdminCarDataScreen = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("/api/admin/getCarData");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

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
            <h2>Car Management</h2>
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
                </tr>
              </thead>
              <tbody>
                {cars.map((car, index) => (
                  <tr key={car._id}>
                    <td>{index + 1}</td>
                    <td>{car.owner.name}</td>
                    <td>{car.owner.mobile}</td>
                    <td>{car.name}</td>
                    <td>{car.year}</td>
                    <td>{car.transmission}</td>
                    <td>{car.fuel}</td>
                    <td>
                      <a
                        href={`http://localhost:5000/uploads/${car.document}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`http://localhost:5000/uploads/${car.document}`}
                          alt="Car Image"
                          style={{
                            maxWidth: "100px",
                            maxHeight: "100px",
                            cursor: "pointer",
                          }}
                        />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AdminCarDataScreen;
