import { Routes, Route } from "react-router-dom";
import OwnerLoginScreen from "../ownerScreens/OwnerLoginScreen.jsx";
import OwnerHomeScreen from "../ownerScreens/OwnerHomeScreen.jsx";
import OwnerRegisterScreen from "../ownerScreens/OwnerRegisterScreen.jsx";
import OwnerPrivateRoutes from '../components/OwnerPrivateRoutes.jsx'
import OwnerProfile from '../ownerScreens/OwnerProfile.jsx'
import OwnerOtpScreen from "../ownerScreens/OwnerOtpScreen.jsx";
import OwnerCarRegisterScreen from "../ownerScreens/OwnerCarRegisterScreen.jsx";
import OwnerTermsNConditions from "../ownerScreens/OwnerTermsNConditions.jsx";
import OwnerBookingScreen from "../ownerScreens/OwnerBookingScreen.jsx";
import OwnerCarScreen from "../ownerScreens/OwnerCarScreen.jsx";


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
      <Route path='/addcar' element={<OwnerCarRegisterScreen/>}/>
      <Route path='/termsNconditions' element={<OwnerTermsNConditions/>}/>
      <Route path='/bookings' element={<OwnerBookingScreen/>}/>
      <Route path='/cars' element={<OwnerCarScreen/>}/>
      </Route>

      </Routes>
    </>
  )
}

export default OwnerRoutes
