import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../ownerSlices/ownerApiSlice";

const OwnerRegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { ownerInfo } = useSelector((state) => state.owner);
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (ownerInfo) {
      navigate("/owner/verify-otp");
    }
  }, [navigate, ownerInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, mobile, password }).unwrap();
        localStorage.setItem("tempOwnerInfo", JSON.stringify({ email }));
        toast.success("OTP sent successfully...");
        navigate("/owner/verify-otp", { state: { email: res.email } });
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div className="ownerLogin">
        <div>
          <form className="ownerForm2" onSubmit={submitHandler}>
            <h1 className="heading">Sign Up</h1>

            <div className="ownerDiv1">
              <label htmlFor="lastName">Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={name}
                placeholder="Enter Your Name "
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="ownerDiv1">
              <label htmlFor="lastName">Email</label>
              <input
                type="email"
                name="lastName"
                id="lastName"
                value={email}
                placeholder="Enter Your Email "
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="ownerDiv1">
              <label htmlFor="lastName">Mobile</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={mobile}
                placeholder="Enter Your Mobile "
                onChange={(e) => setMobile(e.target.value)}
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

            <div className="ownerDiv1">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="Password"
                id="Password"
                value={confirmPassword}
                placeholder="Confirm Your Password "
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div>
              {isLoading && <Loader />}
              <button className="btn" type="submit">
                SIGN IN
              </button>
            </div>
            <div className="register">
              Already have an account ?{" "}
              <Link to="/owner/login">Login Here</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OwnerRegisterScreen;
