import React, { useState, useEffect } from "react";
import { Card, Table, Button, Modal, Form } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import Swal from "sweetalert2"


const AdminCategoryScreen = () => {
  const containerStyle = {
    paddingTop: "5rem",
    paddingLeft: "5rem",
    paddingRight: "5rem",
    width: "97%",
    backgroundColor: "rgba(53, 55, 67, 1)",
    overflowY: 'scroll',
  };

  const headerStyle = {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  };

  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [extraPrice, setExtraPrice] = useState("");


  const [showAddModal, setShowAddModal] = useState(false); // State for adding category
  const [showEditModal, setShowEditModal] = useState(false); // State for editing category
  const [editCatId, setEditCatId] = useState(""); // State to track which category is being edited

  const [datas, setDatas] = useState([]);

  // Fetching data to display
  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await axios.get("/api/admin/getCategory");
        setDatas(response.data.category);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDatas();
  }, []);

  // Handling the modal for adding a new category
  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  // Handling the modal for editing a category
  const handleShowEditModal = async (catId) => {
    try {
      const {data} = await axios.get("/api/admin/category/"+catId);
      setType(data.type);
      setPrice(data.price);
      setExtraPrice(data.extraPrice);
     
    } catch (error) {
      
    }
    setEditCatId(catId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditCatId("");
    setShowEditModal(false);
  };


  // Sending data to backend for adding a new category
  const handleAddSubmit = async (e) => {
    e.preventDefault();
  
    const lowercaseType = type.toLowerCase();

    if (datas.some((data) => data.type.toLowerCase() === lowercaseType)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Category with the same name already exists.",
      });
      return; 
    }
  
    try {
      const response = await axios.post("/api/admin/category", {
        type: lowercaseType, 
        price,
        extraPrice,
      });
      setDatas(response.data);
      setType("");
      setPrice("");
      setExtraPrice("");
      handleCloseAddModal();
      Swal.fire({
        icon: "success",
        title: "Category Added",
        text: "The category has been added successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding the category.",
      });
    }
  };
  
  

// Sending data to backend for editing a category
const handleEditSubmit = async (e) => {
  e.preventDefault();
  
  const lowercaseType = type.toLowerCase();
  if (
    datas.some((data) => 
      data.type.toLowerCase() === lowercaseType && data._id !== editCatId
    )
  ) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Category with the same name already exists.",
    });
    return;
  }

  try {
    const response = await axios.put(`/api/admin/category/${editCatId}`, {
      type: lowercaseType, 
      price,
      extraPrice,
    });
    setDatas([...response.data]);
    Swal.fire({
      icon: "success",
      title: "Category Edited",
      text: "The category has been edited successfully.",
    });
  } catch (error) {
    console.log(error.message);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "An error occurred while editing the category.",
    });
  }
  handleCloseEditModal();
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
      <div style={containerStyle}>
        <Card>
          <Card.Body>
            <h2 style={headerStyle}>Categories</h2>
            <div style={{ textAlign: "right" }}>
              <Button variant="success" onClick={handleShowAddModal}>
                Add
              </Button>
            </div>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Car Type</th>
                  <th>Car Rent</th>
                  <th>Extra KM Rent</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr key={data._id}>
                    <td>{index + 1}</td>
                    <td>{data.type}</td>
                    <td>{data.price}</td>
                    <td>{data.extraPrice}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleShowEditModal(data._id)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>

      {/* Modal for adding category */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Car Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="carType">
              <Form.Label>Car Type</Form.Label>
              <Form.Control
                type="text"
                name="carType"
                onChange={(e) => setType(e.target.value)}
                placeholder="Enter Car Type"
              />
            </Form.Group>
            <Form.Group controlId="carPrice">
              <Form.Label>Car Rent</Form.Label>
              <Form.Control
                type="text"
                name="carPrice"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Car Rent"
              />
            </Form.Group>
            <Form.Group controlId="extraKmPrice">
              <Form.Label>Extra KM Price</Form.Label>
              <Form.Control
                type="text"
                name="extraKmPrice"
                onChange={(e) => setExtraPrice(e.target.value)}
                placeholder="Enter Extra KM Price"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing category */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Car Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="carType">
              <Form.Label>Car Type</Form.Label>
              <Form.Control
                type="text"
                name="carType"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Enter Car Type"
              />
            </Form.Group>
            <Form.Group controlId="carPrice">
              <Form.Label>Car Rent</Form.Label>
              <Form.Control
                type="text"
                name="carPrice"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Car Rent"
              />
            </Form.Group>
            <Form.Group controlId="extraKmPrice">
              <Form.Label>Extra KM Price</Form.Label>
              <Form.Control
                type="text"
                name="extraKmPrice"
                value={extraPrice}
                onChange={(e) => setExtraPrice(e.target.value)}
                placeholder="Enter Extra KM Price"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminCategoryScreen;
