import { Routes, Route } from "react-router-dom";
import NotFound from "../components/NotFound.jsx";
import AdminHomeScreen from "../adminScreens/AdminHomeScreen.jsx";
import AdminLoginScreen from "../adminScreens/AdminLoginScreen.jsx";
import AdminPrivateRoute from "../components/AdminPrivateRoute.jsx";
import AdminOwnerList from "../adminScreens/AdminOwnerList.jsx";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
      <Route  path='/login' element={<AdminLoginScreen/>}/>
      <Route index={true} path='*' element={<NotFound/>} />
      <Route path='' element={<AdminPrivateRoute/>}>
      <Route index={true} path='/home' element={<AdminHomeScreen/>}/>
      <Route index={true} path='/owner' element={<AdminOwnerList/>}/>
      </Route>
      </Routes>
    </>
  )
}

export default AdminRoutes
