import { Navigate, Outlet, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from '../slices/authSlice'
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useEffect } from "react";

const PrivateRoute = () => {
    const {userInfo} = useSelector ((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    const isBlocked = userInfo && userInfo.isBlocked;
    if (isBlocked) {
      dispatch(logout());
    }

    useEffect(() => {
      const checkAuth = async () => {
          try {
              const response = await fetch('http://localhost:5000/api/users/checkUser', {
                  credentials: 'include' // Include cookies in the request
              });
              if (!response.ok) {
                  await logoutApiCall().unwrap();
                  dispatch(logout());
                  navigate('/login');
              }
          } catch (error) {
              console.error('Check auth error:', error);
          }
      };
    
      if (userInfo) {
          checkAuth();
      }
    }, [userInfo, dispatch, logoutApiCall, navigate]);

  return userInfo ? <Outlet/> : <Navigate to='/login' replace />

}

export default PrivateRoute

