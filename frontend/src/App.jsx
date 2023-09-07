import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from "./components/AdminHeader";
import { useLocation } from "react-router-dom";


function App() {

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');


  return (
    <>
    {isAdminPage ? <AdminHeader/> : <Header/>}

    <ToastContainer />
         <Outlet/>
    </>
  )
}

export default App
