import { Routes, Route } from "react-router-dom";
import NotFound from "../components/NotFound.jsx";
import AdminHomeScreen from "../adminScreens/AdminHomeScreen.jsx";
import AdminLoginScreen from "../adminScreens/AdminLoginScreen.jsx";
import AdminPrivateRoute from "../components/AdminPrivateRoute.jsx";
import AdminOwnerList from "../adminScreens/AdminOwnerList.jsx";
import AdminCategoryScreen from "../adminScreens/AdminCategoryScreen.jsx";
import AdminRequestScreen from "../adminScreens/AdminRequestScreen.jsx";
import AdminCarDataScreen from "../adminScreens/AdminCarDataScreen.jsx";


const AdminRoutes = () => {
  return (
    <>
      <Routes>
      <Route  path='/login' element={<AdminLoginScreen/>}/>
      <Route index={true} path='*' element={<NotFound/>} />
      <Route path='' element={<AdminPrivateRoute/>}>
      <Route index={true} path='/home' element={<AdminHomeScreen/>}/>
      <Route index={true} path='/owner' element={<AdminOwnerList/>}/>
      <Route index={true} path="/category" element={<AdminCategoryScreen/>}/>
      <Route index={true} path="/getCars" element={<AdminRequestScreen/>}/>
      <Route index={true} path="/getCarData" element={<AdminCarDataScreen/>}/>
      </Route>
      </Routes>
    </>
  )
}

export default AdminRoutes
