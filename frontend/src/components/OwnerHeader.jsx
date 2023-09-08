import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../ownerSlices/ownerApiSlice';
import { logout } from '../ownerSlices/ownerAuthSlice';



const OwnerHeader = () => {

  const headerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
  };
  
  const headerNavStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'white', // Set the font color to white
  };
  
  const { ownerInfo } = useSelector((state) => state.owner);
  console.log(ownerInfo)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/owner');
    } catch (err) {
      console.log(err);
    }
  };
   
  return (
    <Navbar expand="lg" className="bg-black">
      <Container>
        <div style={headerContainerStyle}>
          <Navbar.Brand className="text-white">
            RENT <span style={{ color: 'red' }}>N</span> ROLL OWNER
          </Navbar.Brand>
        </div>
        {ownerInfo ? (
          <div style={headerNavStyle}>
            <Nav className="ms-auto">
              <LinkContainer to="/owner" style={{ backgroundColor: 'black', color: 'white' }}>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/owner" style={{ backgroundColor: 'black', color: 'red' }}>
                <Nav.Link>Bookings</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/owner" style={{ backgroundColor: 'black', color: 'white' }}>
                <Nav.Link>Terms&Conditions</Nav.Link>
              </LinkContainer>
              <NavDropdown title={<span style={{ color: 'white' }}>{ownerInfo.name}</span>} id='ownername'>
                <LinkContainer to='/owner/profile'>
                  <NavDropdown.Item >
                    Profile
                  </NavDropdown.Item>
                  </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler} >Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
        ) : (
          <LinkContainer to="/owner/login" style={{ color: 'white', backgroundColor: 'black' }}>
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        )}
      </Container>
    </Navbar>
  )
}

export default OwnerHeader
