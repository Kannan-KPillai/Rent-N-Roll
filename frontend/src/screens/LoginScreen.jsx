import { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import './styles/Login.css'


const LoginScreen = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation();

    const {userInfo} = useSelector((state) => state.auth);

    useEffect(()=> {
      if(userInfo) {
         navigate('/')
      }
    }, [navigate,userInfo])

    const submitHandler = async (e)=> {
        e.preventDefault();
        try{
          const res = await login({ email, password }).unwrap();
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
            <h1>Log In</h1>

            <div className="div1">
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

            <div>
              {isLoading && <Loader />}
              <button className="btn" type="submit">
                SIGN IN
              </button>
            </div>
            <div className="register">
              Don't have an account ? <Link to="/register">Register</Link>
            </div>
          </form>
            </div>
      </div>
    </>
  );
}

export default LoginScreen
