import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../adminSlices/adminApiSlice";
import { logout } from "../adminSlices/adminAuthSlice";
import {NavDropdown} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';


function AdminHeader() {
  const headerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
  };

  const headerNavStyle = {
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'white'
  };


  const {adminInfo} = useSelector((state) => state.admin)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
 
  const logoutHandler = async () =>{
    try{
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate('/admin/login');
    }catch(err){
      console.log(err)
    }
  }


  return (
    <Navbar expand="lg" className="bg-dark">
    <Container>
      <div style={headerContainerStyle}>
        <Navbar.Brand  className="text-white" style={{ fontFamily: 'Carter One, sans-serif' }}>
          RENT <span style={{ color: 'red' }}>N</span> ROLL ADMIN
        </Navbar.Brand>
        </div>
        {adminInfo ? (
          <>
           <div style={headerNavStyle}>
            <NavDropdown title='ADMIN' id='adminname'>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>   
      </div>
          </>
        ) : (
          <>
           
          </>
        )}
       
    </Container>
  </Navbar>
  );
};

export default AdminHeader;