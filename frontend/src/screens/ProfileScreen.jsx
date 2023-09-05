import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Form, Button} from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import {toast} from 'react-toastify';
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    
    const dispatch = useDispatch();

    const {userInfo} = useSelector((state)=>state.auth);

    const [updateProfile,{isLoading}] = useUpdateUserMutation();

    useEffect(()=>{
       setName(userInfo.name);
       setEmail(userInfo.email);
       setMobile(userInfo.mobile);
    },[userInfo.name, userInfo.email, userInfo.mobile]);


    const submitHandler = async (e) =>{
        e.preventDefault();
        if (password !== confirmPassword){
            toast.error('Passwords do not match')
        }else{
            try {
                const res = await updateProfile({
                _id: userInfo._id,
                name,
                email,
                mobile,
                password
            }).unwrap();
            dispatch(setCredentials({...res}));
            toast.success('Profile updated')
                } catch(err){
                toast.error(err?.data?.message || err.error);
            }
        }
    }
  return (
    <FormContainer>
        <h1>Update Profile</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="mobile">
            <Form.Label>Mobile</Form.Label>
                <Form.Control
                type="mobile"
                placeholder= 'Enter Your Mobile'
                value={mobile}
                onChange={ (e) => setMobile(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
   
            <Form.Group className="my-2" controlId="ConfirmPassword">
                <Form.Label>confirmPassword</Form.Label>
                <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
                
               {isLoading && <Loader/>}

                <Button type="submit" variant="primary" className="mt-3">
                    Update Changes
                </Button>
               
        </Form>
    </FormContainer>
  )
}

export default ProfileScreen;
