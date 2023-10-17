import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useVerifyMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
// import Loader from "../components/Loader";

const OtpVerificationScreen = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

   const {userInfo} = useSelector((state) => state.auth);
   const tempInfo = localStorage.getItem("tempInfo");

  useEffect(()=> {
    if(userInfo) {
       navigate('/') 
    }
  }, [navigate,userInfo])

 
 
  const userEmail = JSON.parse(tempInfo);
  const email = userEmail.email;

  const [verify, { isLoading }] = useVerifyMutation();

  

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await verify({ email, otp });
      console.log(res);

      if (res.error) {
        toast.error("wrong otp");
      } else {     
        dispatch(setCredentials({ ...res }));
        toast.success('Account succesfully created');
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="login">
        <div>
          <form className="form1" onSubmit={submitHandler}>
            <h1>OTP Verification</h1>
              <h6 style={{color: 'red'}}>* OTP has sent to your email</h6>
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
              {isLoading }
              <button className="btn" type="submit">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpVerificationScreen;
