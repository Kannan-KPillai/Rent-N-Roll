import { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useOtpUserMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";


const OtpVerificationScreen = () => {

    const [otp,setOtp] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [validate, {isLoading}] = useOtpUserMutation();

    const {userInfo} = useSelector((state) => state.auth);
    useEffect(()=> {
      if(userInfo) {
         navigate('/')
      }
    }, [navigate,userInfo])

    const submitHandler = async (e)=> {
        e.preventDefault();
        try{
          const res = await login({ otp }).unwrap();
          dispatch(setCredentials({...res}))
          navigate('/')
        }catch(err){
            toast.error(err?.data?.message || err.error)
        }
    }

  return (
    <>
      <div className="login">
        <div>
          <form className="form1" onSubmit={submitHandler}>
            <h1>OTP Verification</h1>

            <div className="div1">
              <label htmlFor="lastName">OTP</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={otp}
                placeholder="Enter your OTP "
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            

            <div>
              {isLoading && <Loader />}
              <button className="btn" type="submit">
                SUBMIT
              </button>
            </div>

          </form>
            </div>
      </div>
    </>
  )
}

export default OtpVerificationScreen
