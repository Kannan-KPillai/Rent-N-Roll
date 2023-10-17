import { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation,  useGoogleLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
// import Loader from "../components/Loader";
import './styles/Login.css'
import { GoogleLogin, GoogleOAuthProvider  } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'




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

    const [googleLogin] = useGoogleLoginMutation();


 const handleGoogleSignInSuccess = async (response) => {
  const decoded = jwt_decode(response.credential); // Decode the Google response
  console.log(decoded)
  const { sub, name, email, picture } = decoded;

  try {
    const googleLoginData = {
      user_id: sub,
      name: name,
      email: email,
      profileGoogleImage: picture,
    };

    const res = await googleLogin(googleLoginData).unwrap();
    console.log(res);
    dispatch(setCredentials({ ...res }));
    navigate('/');
  } catch (error) {
    toast.error('Error during Google sign-in:', error);
  }
};

  return (
    <GoogleOAuthProvider clientId="427083747377-vjqptmsf4f720eos2k1vinkl78kmf5s4.apps.googleusercontent.com">
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
              {isLoading }
              <button className="btn" type="submit">
                SIGN IN
              </button>
            </div>
            <div className="register">
              Don't have an account ? <Link to="/register">Register</Link>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '1rem' }}>
            <GoogleLogin
                      onSuccess={handleGoogleSignInSuccess}
                      onError={()=>console.log("error")}
                      />
</div>

          </form>
            </div>
           
      </div>
    </>
    </GoogleOAuthProvider>
  );
}

export default LoginScreen
