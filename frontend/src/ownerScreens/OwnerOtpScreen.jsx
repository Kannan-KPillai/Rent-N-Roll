import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useVerifyMutation } from '../ownerSlices/ownerApiSlice'
import { toast } from "react-toastify";
import { setOwnerCredentials } from "../ownerSlices/ownerAuthSlice";
import Loader from "../components/Loader";


const OwnerOtpScreen = () => {

    const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tempOwnerInfo = localStorage.getItem("tempOwnerInfo");

  const {ownerInfo} = useSelector((state) => state.owner);

  useEffect(()=> {
    if(ownerInfo) {
       navigate('/owner')
    }
  }, [navigate,ownerInfo])

  const ownerEmail = JSON.parse(tempOwnerInfo);
  const email = ownerEmail.email;

  const [verify, { isLoading }] = useVerifyMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await verify({ email, otp });

      if (res.error) {
        toast.error("wrong otp");
      } else {
        dispatch(setOwnerCredentials({ ...res }));
        toast.success('Account successfully created...');
        navigate("/owner");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  return (
    <>
      <div className="ownerLogin">
        <div>
          <form className="ownerForm12" onSubmit={submitHandler}>
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

export default OwnerOtpScreen
