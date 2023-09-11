import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavDropdown, Badge} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector, useDispatch} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import { useLogoutMutation, useVerifyMutation } from '../slices/usersApiSlice';
import { logout} from '../slices/authSlice';


function Header() {
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
  };

  const {userInfo} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () =>{
    try{
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate('/');
    }catch(err){
      console.log(err)
    }
  }

  return (
    <Navbar expand="lg" className="bg-white">
      <Container>
        <div style={headerContainerStyle}>
          <Navbar.Brand  className="text-black">
            RENT <span style={{ color: 'red' }}>N</span> ROLL
          </Navbar.Brand>
          </div>
          {userInfo ? (
            <>
             <div style={headerNavStyle}>
            <Nav className="ms-auto" >
              <LinkContainer to='/'  style={{ backgroundColor: 'white'}}>
                  <Nav.Link >Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to=''  style={{ backgroundColor: 'white'}}>
                  <Nav.Link >About</Nav.Link>
              </LinkContainer>
              <LinkContainer to=''  style={{ backgroundColor: 'white'}}>
                  <Nav.Link>Contact Us</Nav.Link>
              </LinkContainer>
              <LinkContainer to='' style={{ color: 'red', backgroundColor: 'white' }}>
                   <Nav.Link> Your Bookings</Nav.Link>
              </LinkContainer>
              <NavDropdown title={userInfo.name || userInfo.data.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler} >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>   
            </Nav>
        </div>
            </>
          ) : (
            <>
             <LinkContainer to='/login' style={{ color: 'black', backgroundColor: 'white' }}>
                   <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </>
          )}
         
      </Container>
    </Navbar>
  );
}

export default Header;
