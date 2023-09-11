import { Routes, Route } from "react-router-dom";
import OwnerLoginScreen from "../ownerScreens/OwnerLoginScreen.jsx";
import OwnerHomeScreen from "../ownerScreens/OwnerHomeScreen.jsx";
import OwnerRegisterScreen from "../ownerScreens/OwnerRegisterScreen.jsx";
import OwnerPrivateRoutes from '../components/OwnerPrivateRoutes.jsx'
import OwnerProfile from '../ownerScreens/OwnerProfile.jsx'
import OwnerOtpScreen from "../ownerScreens/OwnerOtpScreen.jsx";


const OwnerRoutes = () => {
  return (
    <>
      <Routes>

      <Route  path='/login' element={<OwnerLoginScreen/>}/>
      <Route  path='/register' element={<OwnerRegisterScreen/>}/>
      <Route path="/verify-otp" element={<OwnerOtpScreen/>}/>
    
      <Route path='' element={<OwnerPrivateRoutes/>}>
      <Route index={true} path='/' element={<OwnerHomeScreen/>}/>
      <Route path='/profile' element={<OwnerProfile />}/>

      </Route>

      </Routes>
    </>
  )
}

export default OwnerRoutes
