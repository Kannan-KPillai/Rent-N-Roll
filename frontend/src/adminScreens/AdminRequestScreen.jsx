import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Modal, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import data from '../screens/data/data.json';
import Lottie from 'lottie-react';

const AdminRequestScreen = () => {
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rejectedCarId, setRejectedCarId] = useState(null);
  const [rejectedCarIndex, setRejectedCarIndex] = useState(null);
  const [reason, setReason] = useState("");

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

  const handleOpenModal = (carId, index) => {
    setRejectedCarId(carId);
    setRejectedCarIndex(index);
    setShowModal(true);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

 const handleSubmitReason = async () => {
  try {
    const response = await axios.put(`/api/admin/rejectCar?carId=${rejectedCarId}`, { reason });

    if (response.status === 200) {
      Swal.fire({
        title: "Car Rejected",
        text: "This car has been rejected.",
        icon: "error",
        confirmButtonText: "OK",
      });

      const updatedCars = [...cars];
      updatedCars[rejectedCarIndex].showButtons = false;
      setCars(updatedCars);

      setShowModal(false);
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
              <div style={{ height: '30rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Lottie animationData={data} style={{ width: '50%', marginBottom: '1rem' }} />
                <h1
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    paddingBottom: '3rem'
                  }}
                >
                  No New Requests
                </h1>
              </div>
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
                              href={car.document.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={car.document.url}
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
                                onClick={() => handleOpenModal(car._id, index)}
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Reason</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={reason}
            onChange={handleReasonChange}
            placeholder="Enter reason for rejection"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitReason}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminRequestScreen;
