import '../styles/findCarForm.css';
import { useState } from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const FindCarForm = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Initialize the form data state
  const [formData, setFormData] = useState({
    pickupPoint: '',
    pickupDate: '',
    pickupTime: '',
    dropoffPoint: '',
    dropoffDate: '',
  });

  const handleFormSubmit = (e) => {
    window.scrollTo({
      top: 0,             
      behavior: 'smooth'  
    });
    e.preventDefault();

    if (!userInfo) {
      toast.error('Please login to continue.');
    } else {

      localStorage.setItem('booking', JSON.stringify(formData));
      navigate('/carList')

      setFormData({
        pickupPoint: '',
        pickupDate: '',
        pickupTime: '',
        dropoffPoint: '',
        dropoffDate: '',
      });
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const getMinDropoffDate = () => {
    if (formData.pickupDate) {
      const pickupDate = new Date(formData.pickupDate);
      pickupDate.setDate(pickupDate.getDate() + 1); 
      return pickupDate.toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  };

  return (
    <Form className="form" onSubmit={handleFormSubmit}>
      <div className="search-box">
        <FormGroup className="from__group" style={{ width: '100%' }}>
          <Label for="pickupPoint">Pickup Point</Label>
          <select
            id="pickupPoint"
            onChange={handleInputChange}
            value={formData.pickupPoint}
          >
            <option value="">Select pickup point</option>
            <option value="Vytilla Hub">Vytilla Hub</option>
            <option value="Kaloor Stadium">Kaloor Stadium</option>
            <option value="Edappally Metro">Edappally Metro</option>
            <option value="Kalamasseri Metro">Kalamasserri Metro</option>
            <option value="Aluva Station">Aluva Station</option>
            <option value="South Railway">South Railway</option>
            <option value="Kakkanad Infopark">InfoPark expressway</option>
          </select>
        </FormGroup>
        <FormGroup className="from__group">
          <Label for="pickupDate">Pickup Date</Label>
          <input
            type="date"
            id="pickupDate"
            value={formData.pickupDate}
            onChange={handleInputChange}
            placeholder="Select pickup date"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </FormGroup>

        <FormGroup className="from__group">
          <Label for="pickupTime">Pickup Time</Label>
          <input
            type="time"
            id="pickupTime"
            value={formData.pickupTime}
            onChange={handleInputChange}
            placeholder="Pickup Time"
            required
          />
        </FormGroup>

        <FormGroup className="from__group">
          <Label for="dropoffPoint">Dropoff Point</Label>
          <select
            id="dropoffPoint"
            onChange={handleInputChange}
            value={formData.dropoffPoint}
          >
            <option value="">Select dropoff point</option>
            <option value="Vytilla Hub">Vytilla Hub</option>
            <option value="Kaloor Stadium">Kaloor Stadium</option>
            <option value="Edappally Metro">Edappally Metro</option>
            <option value="Kalamasseri Metro">Kalamasserri Metro</option>
            <option value="Aluva Station">Aluva Station</option>
            <option value="South Railway">South Railway</option>
            <option value="Kakkanad Infopark">InfoPark expressway</option>
          </select>
        </FormGroup>

        <FormGroup className="from__group">
  <Label for="dropoffDate">Dropoff Date</Label>
  <input
    type="date"
    id="dropoffDate"
    value={formData.dropoffDate}
    onChange={handleInputChange}
    placeholder="Select dropoff date"
    required
    min={getMinDropoffDate()}
  />
</FormGroup>

      </div>
      <div className="find-button">
        <button className="btn find__car-btn">Find Car</button>
      </div>
    </Form>
  );
};

export default FindCarForm;
