import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation} from '../adminSlices/adminApiSlice';
import { logout } from '../adminSlices/adminAuthSlice';


const AdminPrivateRoute = () => {
    const {adminInfo} = useSelector ((state) => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();


    useEffect(() => {
      const checkAdmin = async () => {
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
          try {
              const response = await fetch('http://localhost:5000/api/admin/checkAdmin', {
                  credentials: 'include' // Include cookies in the request
              });
              if (!response.ok) {
                  await logoutApiCall().unwrap();
                  dispatch(logout());
                  navigate('/admin/login');
              }
          } catch (error) {
              console.error('Check auth error:', error);
          }
      };
    
      if (adminInfo) {
          checkAdmin();
      }
    }, [adminInfo, dispatch, logoutApiCall, navigate]);


  return adminInfo ? <Outlet/> : <Navigate to='/admin/login' replace />

}

export default AdminPrivateRoute