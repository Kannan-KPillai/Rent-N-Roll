import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from "./components/AdminHeader";
import { useLocation } from "react-router-dom";
import OwnerHeader from "./components/OwnerHeader";
import Footer from './components/Footer'
import axios from 'axios';


function App() {

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isOwnerPage = location.pathname.startsWith('/owner');

  // axios.defaults.baseURL = 'http://localhost:5000/api';
  // axios.defaults.withCredentials = true;

  return (
    <>
    {isAdminPage ? (
      <AdminHeader />
    ) : isOwnerPage ? (
      <OwnerHeader />
    ) : (
      <Header />
    )}

    <ToastContainer />
         <Outlet/>
         <Footer/>
    </>
    
  )
}

export default App
