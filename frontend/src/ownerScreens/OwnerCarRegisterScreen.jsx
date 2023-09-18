import React, { useState, useEffect } from "react";
import "./styles/carRegister.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const OwnerCarRegisterScreen = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuel, setFuel] = useState("");
  const [image, setImage] = useState([]);
  const [document, setDocument] = useState([]);

  const [rent, setBasicRent] = useState("");
  const [extraRent, setExtraKmPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Added selectedCategory state

  const { ownerInfo } = useSelector((state) => state.owner);

  // Fetching data to display
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/owner/getCategory");
        setCategories(response.data.category);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle car type change
  const handleCarTypeChange = (e) => {
    const selectedCarType = e.target.value;
    setSelectedCategory(selectedCarType); // Update selectedCategory
    try {
      const selectedCategoryData = categories.find(
        (category) => category.type === selectedCarType
      );

      if (selectedCategoryData) {
        setBasicRent(selectedCategoryData.price.toString());
        setExtraKmPrice(selectedCategoryData.extraPrice.toString());
      } else {
        setBasicRent("");
        setExtraKmPrice("");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage([...e.target.files]); // Use e.target.files to get the selected files
  };

  const handleDocumentChange = (e) => {
    setDocument([...e.target.files]); // Use e.target.files to get the selected files
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !year || !transmission || !fuel || !selectedCategory) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all required fields.",
      });
      return; // Exit the function if any required field is empty
    }

    try {
      const arr = [image[0], document[0]];
      console.log("HIIIIIIi");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("year", year);
      formData.append("transmission", transmission);
      formData.append("fuel", fuel);
      formData.append("categories", selectedCategory); // Use selectedCategory
      formData.append("rent", rent);
      formData.append("extraRent", extraRent);

      // Append each image and document separately
      for (let i = 0; i < arr.length; i++) {
        formData.append("file", arr[i]);
      }
      formData.append("owner", ownerInfo._id);
      formData.append('ownerName', ownerInfo.name);
      formData.append('ownerMobile', ownerInfo.mobile);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post(
        "/api/owner/registerCar",
        formData,
        config
      );

      // Check if the request was successful (you can adjust this condition as needed)
      if (response.status === 201) {
        // Show a success SweetAlert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Car registered successfully!",
        });

      setName("");
      setYear("");
      setTransmission("");
      setFuel("");
      setImage([]);
      setDocument([]);
      setBasicRent("");
      setExtraKmPrice("");
      setSelectedCategory("");
      }
      navigate('/owner')
    } catch (error) {
      console.error("Error submitting form:", error);
      // Show an error SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while registering the car. Please try again later.",
      });
    }
  };

  return (
    <div className="main-div">
      <div className="registration-container">
        <h1 className="heading1">Car Registration Form</h1>

        <div className="form-group">
          <label htmlFor="carName">Car Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="transmission">Transmission:</label>
          <select
            id="transmission"
            name="transmission"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
          >
             <option value="">Select transmission type</option>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fuel">Fuel:</label>
          <select
            id="fuel"
            name="fuel"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
          >
            <option value="">Select fuel type</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="carType">Car Type:</label>
          <select
            id="categories"
            name="categories"
            value={selectedCategory}
            onChange={handleCarTypeChange}
          >
            <option value="">Select Car Type</option>
            {categories.map((category) => (
              <option key={category._id} value={category.type}>
                {category.type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="basicRent">Basic Rent:</label>
          <input
            type="text"
            id="rent"
            name="rent"
            value={rent}
            readOnly
            onChange={(e) => setBasicRent(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="extraKmPrice">Extra Km Price:</label>
          <input
            type="text"
            id="extraRent"
            name="extraRent"
            value={extraRent}
            readOnly
            onChange={(e) => setExtraKmPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="carImage">Car Image:</label>
          <input
            type="file"
            id="carImage"
            name="Image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="document">Car Document:</label>
          <input
            type="file"
            id="document"
            name="document"
            accept="image/*"
            onChange={handleDocumentChange}
          />
        </div>
        <div style={{ paddingLeft: "13rem" }}>
          <button type="submit" className="add-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerCarRegisterScreen;
