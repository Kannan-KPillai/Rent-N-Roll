import React, { useState, useEffect } from "react";
import "./styles/carRegister.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

  const OwnerCarRegisterScreen = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [transmission, setTransmission] = useState("");
    const [fuel, setFuel] = useState("");
    const [imageBase64, setImageBase64] = useState(""); // Add imageBase64 state
    const [documentBase64, setDocumentBase64] = useState(""); // Add documentBase64 state

    const [rent, setBasicRent] = useState("");
    const [extraRent, setExtraKmPrice] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const { ownerInfo } = useSelector((state) => state.owner);
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get("/api/owner/getCategory", {withCredentials: true });
          setCategories(response.data.category);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchCategories();
    }, []);

    const handleCarTypeChange = (e) => {
      const selectedCarType = e.target.value;
      setSelectedCategory(selectedCarType);

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
      const file = e.target.files[0];
      setFileToBase(file, setImageBase64);
    };

    const handleDocumentChange = (e) => {
      const file = e.target.files[0];
      setFileToBase(file, setDocumentBase64);
    };

    const setFileToBase = (file, setter) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setter(reader.result);
      };
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!name || !year || !transmission || !fuel || !selectedCategory) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please fill in all required fields.",
        });
        return;
      }
      try {
        const formData = {
          name,
          year,
          transmission,
          fuel,
          categories: selectedCategory,
          rent,
          extraRent,
          image: imageBase64,
          document: documentBase64,
          owner: ownerInfo._id,
          ownerName: ownerInfo.name,
          ownerEmail : ownerInfo.email,
          ownerMobile: ownerInfo.mobile
        };

        const config = {
          headers: {
            "Content-Type": "application/json", // Use JSON content type
          },
        };

        const response = await axios.post(
          "/api/owner/registerCar",
          JSON.stringify(formData), // Send as JSON string
          config
        );

        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Car registered successfully!",
          });

          // Reset the form fields
          setName("");
          setYear("");
          setTransmission("");
          setFuel("");
          setImageBase64("");
          setDocumentBase64("");
          setBasicRent("");
          setExtraKmPrice("");
          setSelectedCategory("");
        }
        navigate("/owner");
      } catch (error) {
        console.error("Error submitting form:", error);
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
