import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from "./components/AdminHeader";
import { useLocation } from "react-router-dom";
import OwnerHeader from "./components/OwnerHeader";



function App() {

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isOwnerPage = location.pathname.startsWith('/owner');


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
    </>
  )
}

export default App
