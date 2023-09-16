import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import { toast } from 'react-toastify';
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || userInfo.data.name || '');
      setEmail(userInfo.email || userInfo.data.email || '');
      // setMobile(userInfo.mobile || userInfo.data.mobile || '');
    }
  }, [userInfo]);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        if (!userInfo) {
          throw new Error('User information not available');
        }

        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          // mobile,
          password
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated');
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  }

  return (
    <div style={{height: '680px'}}>
    <FormContainer >
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: 'black', fontSize: '2rem', marginBottom: '20px' }}>Update Profile</h1>
      </div>
      <Form onSubmit={submitHandler} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Form.Group controlId="name">
          <Form.Label style={{ fontWeight: 'bold' }}>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label style={{ fontWeight: 'bold' }}>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* <Form.Group controlId="mobile">
          <Form.Label style={{ fontWeight: 'bold' }}>Mobile</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter Your Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </Form.Group> */}

        <Form.Group controlId="password">
          <Form.Label style={{ fontWeight: 'bold' }}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label style={{ fontWeight: 'bold' }}>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        {isLoading && <Loader />}

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          style={{ backgroundColor: '#007BFF', borderColor: '#007BFF', fontWeight: 'bold' }}
        >
          Update Changes
        </Button>
      </Form>
    </FormContainer>
    </div>
  );
}

export default ProfileScreen;
