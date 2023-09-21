import { Navigate, Outlet, useNavigate} from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../ownerSlices/ownerAuthSlice";
import { useLogoutMutation } from "../ownerSlices/ownerApiSlice";


const OwnerPrivateRoutes = () => {
    const {ownerInfo} = useSelector ((state) => state.owner);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    
    useEffect(() => {
        const fetchUserStatus = async () => {
          try {
            const {data}= await axios.get(`/api/owner/status/${ownerInfo._id}`);
            if (data.isBlocked) {
              await logoutApiCall().unwrap();
              dispatch(logout());
              navigate('/owner/login');
            }
          } catch (error) {
            console.error('Fetch user status error:', error);
          }
        };
    
        if (ownerInfo) {
          fetchUserStatus();
        }
      }, [ownerInfo, dispatch, logoutApiCall, navigate]);


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/owner/checkOwner', {
                    credentials: 'include' // Include cookies in the request
                });
                if (!response.ok) {
                    await logoutApiCall().unwrap();
                    dispatch(logout());
                    navigate('/owner/login');
                }
            } catch (error) {
                console.error('Check auth error:', error);
            }
        };
      
        if (ownerInfo) {
            checkAuth();
        }
      }, [ownerInfo, dispatch, logoutApiCall, navigate]);
  


    return ownerInfo ? <Outlet/> : <Navigate to='/owner/login' replace />
  
}


export default OwnerPrivateRoutes