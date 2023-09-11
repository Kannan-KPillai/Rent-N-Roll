import { useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";  
import './styles/Login.css'


const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userInfo} = useSelector((state) => state.auth);
    const [register, {isLoading}] = useRegisterMutation();

    useEffect(()=> {
      if(userInfo) {
         navigate('/')
      }
    }, [navigate,userInfo])

    const submitHandler = async (e)=> {
        e.preventDefault();
        if(password !== confirmPassword) {
         toast.error('Passwords do not match')
        }else{
         try{
            const res = await register({ name, email, mobile, password }).unwrap();
            localStorage.setItem('tempInfo', JSON.stringify({email}));
            toast.success('OTP sent successfully');
            navigate('/verify-otp',{ state: { email:res.email } });
         }catch(err){
            toast.error(err?.data?.message || err.error)
         }
        }
    }

  return (
   <>
      <div className="login">
        <div>
          <form className="form1" onSubmit={submitHandler}>
            <h1>Sign Up</h1>

            <div className="div1">
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

            <div className="div1">
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

            
            <div className="div1">
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

            <div className="div1">
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

            <div className="div1">
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
              Already have an account ? <Link to="/login">Login Here</Link>
            </div>
          </form>
            </div>
      </div>
    </>
  )
}

export default RegisterScreen