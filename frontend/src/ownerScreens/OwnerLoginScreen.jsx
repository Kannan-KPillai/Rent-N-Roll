import { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../ownerSlices/ownerApiSlice';
import { setOwnerCredentials } from "../ownerSlices/ownerAuthSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import './styles/login.css';


const OwnerLoginScreen = () => {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation();

    const {ownerInfo} = useSelector((state) => state.owner);

    useEffect(()=> {
      if(ownerInfo) {
         navigate('/owner')
      }
    }, [navigate,ownerInfo])

    const submitHandler = async (e)=> {
        e.preventDefault();
        try{
          const res = await login({ email, password }).unwrap();
          dispatch(setOwnerCredentials({...res}))
          console.log(res)
          navigate('/owner')
        }catch(err){
            toast.error(err?.data?.message || err.error)
        }
    }

  return (
    <>
    <div className="ownerLogin">
      <div>
        <form className="ownerForm1" onSubmit={submitHandler}>
          <h1 className="heading"> Login</h1>

          <div className="ownerDiv1">
            <label htmlFor="lastName">Email</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={email}
              placeholder="Enter Email "
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="ownerDiv1">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="Password"
              id="Password"
              value={password}
              placeholder="Enter Password "
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="submitButton">
            {isLoading && <Loader />}
            <button className="btn" type="submit">
              SIGN IN
            </button>
          </div>
          <div className="register">
            Don't have an account ? <Link to="/owner/register">Register</Link>
          </div>
        </form>
          </div>
    </div>
  </>
  )
}

export default OwnerLoginScreen
