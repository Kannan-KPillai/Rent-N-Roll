import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const OwnerPrivateRoutes = () => {
    const {ownerInfo} = useSelector ((state) => state.owner);
    return ownerInfo ? <Outlet/> : <Navigate to='/owner/login' replace />
  
}


export default OwnerPrivateRoutes