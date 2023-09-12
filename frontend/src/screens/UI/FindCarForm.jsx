import '../styles/FindCarForm.css';
import { Form, FormGroup, Label } from 'reactstrap';

const FindCarForm = () => {
  return (
    <Form className="form">
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="from__group" >
          <Label for="pickupPoint">Pickup Point</Label>
          <select id="pickupPoint">
            <option value="vytilla">Vytilla Hub</option>
            <option value="kaloor">Kaloor Stadium</option>
            <option value="edappally">Edappally Metro</option>
            <option value="kalamasseri">Kalamasserri Metro</option>
            <option value="aluva">Aluva Station</option>
            <option value="south">South Railway</option>
            <option value="kakkanad">InfoPark expressway</option>
          </select>
        </FormGroup>
        <FormGroup className="from__group">
          <Label for="pickupDate">Pickup Date</Label>
          <input type="date" id="pickupDate" placeholder="Select pickup date" required />
        </FormGroup>

        <FormGroup className="from__group">
          <Label for="pickupTime">Pickup Time</Label>
          <input type="time" id="pickupTime" placeholder="Pickup Time" required />
        </FormGroup>

        <FormGroup className="from__group">
          <Label for="dropoffPoint">Dropoff Point</Label>
          <select id="dropoffPoint">
            <option value="vytilla">Vytilla Hub</option>
            <option value="kaloor">Kaloor Stadium</option>
            <option value="edappally">Edappally Metro</option>
            <option value="kalamasseri">Kalamasserri Metro</option>
            <option value="aluva">Aluva Station</option>
            <option value="south">South Railway</option>
            <option value="kakkanad">InfoPark expressway</option>
          </select>
        </FormGroup>

        <FormGroup className="from__group">
          <Label for="dropoffDate">Dropoff Date</Label>
          <input type="date" id="dropoffDate" placeholder="Select dropoff date" required />
        </FormGroup>
      </div>
      <div className="find-button">
          <button className="btn find__car-btn">Find Car</button>
        </div>
    </Form>
  );
}

export default FindCarForm;
