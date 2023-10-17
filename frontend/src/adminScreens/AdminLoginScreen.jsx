import { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../adminSlices/adminApiSlice';
import { setCredentials } from '../adminSlices/adminAuthSlice' 
import { toast } from "react-toastify";
// import Loader from "../components/Loader";
import './AdminLogin.css'

const AdminLoginScreen = () => {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation(); 

    const {adminInfo} = useSelector((state) => state.auth);

    useEffect(()=> {
      if(adminInfo) {
         navigate('/admin/home')
      }
    }, [navigate,adminInfo])

    const submitHandler = async (e)=> {
        e.preventDefault();
        try{
          const res = await login({ email, password }).unwrap();
          dispatch(setCredentials({...res}))
          navigate('/admin/home')
        }catch(err){
            toast.error(err?.data?.message || err.error)
        }
    }


  return (
    <>
      <div className="adminLogin">
        <div>
          <form className="form1" onSubmit={submitHandler}>
            <h1>Admin LogIn</h1>

            <div className="divA">
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
            <div className="divA">
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
              {isLoading }
              <button className="btn" type="submit">
                SIGN IN
              </button>
            </div>
          </form>
            </div>
      </div>
    </>
  )
}

export default AdminLoginScreen
