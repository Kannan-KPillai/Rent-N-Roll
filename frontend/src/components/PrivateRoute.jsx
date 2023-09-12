import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from '../slices/authSlice'


const PrivateRoute = () => {
    const {userInfo} = useSelector ((state) => state.auth);

    const dispatch = useDispatch();
    const isBlocked = userInfo && userInfo.isBlocked;
    if (isBlocked) {
      dispatch(logout());
    }

  return userInfo ? <Outlet/> : <Navigate to='/login' replace />

}

export default PrivateRoute

