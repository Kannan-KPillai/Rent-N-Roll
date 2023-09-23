import { Routes, Route } from "react-router-dom";
import PrivateRoutes from '../components/PrivateRoute.jsx';
import HomeScreen from '../screens/HomeScreen.jsx';
import LoginScreen from '../screens/LoginScreen.jsx';
import RegisterScreen from '../screens/RegisterScreen.jsx';
import ProfileScreen from '../screens/ProfileScreen.jsx';
import NotFound from "../components/NotFound.jsx";
import OtpVerificationScreen from "../screens/OtpVerificationScreen.jsx";
import CarListScreen from "../screens/CarListScreen.jsx";
import CarDetails from "../screens/CarDetails.jsx";
import BookingSuccess from "../screens/BookingSuccess.jsx";
import AboutScreen from "../screens/AboutScreen.jsx";
import BookingScreen from "../screens/BookingScreen.jsx";


const UserRoutes = () => {
  return (
    <>
      <Routes>
      <Route index={true} path='/' element={<HomeScreen/>}/>

      <Route  path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>
      <Route path="/verify-otp" element={<OtpVerificationScreen/>}/>
      <Route index={true} path='*' element={<NotFound/>} />
      {/* Private Routes */}
      <Route path='' element={<PrivateRoutes/>}>
      <Route path='/profile' element={<ProfileScreen/>}/>
      <Route path='/carList' element={<CarListScreen/>}/>
      <Route path='/carDetails/:id' element={<CarDetails/>} />
      <Route path='/carDetails/success' element={<BookingSuccess/>} />
      <Route path='/about' element={<AboutScreen/>} />
      <Route path='/booking' element={<BookingScreen/>} />
      </Route>
      
      </Routes>
    </>
  )
}

export default UserRoutes
