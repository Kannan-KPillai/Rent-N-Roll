import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import './footer.css';

const Footer = () => {

const quickLinks = [
    {
        path:'#',
        display:'About'
    },
    {
        path:'#',
        display:'Privacy Policy'
    },
    {
        path:'#',
        display:'Terms&Conditions',
    },
    {
        path:'#',
        display:'Customer Care'
    },
    {
        path:'#',
        display:'Help Center'
    }
]


  return (
    <footer className="footer">
        <Container>
            <Row>
                <Col lg='4' md='4' sm='12' >
                    <div className='logo footer__logo'>
                        <h1 style={{ fontFamily: 'Carter One, sans-serif' }}>RENT <span style={{color:'red'}}>N</span> ROLL</h1>
                    </div>
                    <p className='footer__logo-content'>
                    Join our growing community of car owners and
                    benefit from a streamlined rental process.
                    This way, you can concentrate on what you do best  
                    providing top-notch vehicles for rent and excellent
                    customer service to your clients!
                    </p>
                </Col>
                <Col lg='2' md='4' sm='6'>
                    <div className='mb-4'>
                        <h5 className="footer__link-title">Quick Links</h5>
                        <ListGroup>
                            {
                                quickLinks.map((item, index)=>(
                                     <ListGroupItem key={index} className='p-0 mt-3 quick__link'>
                                        <Link>{item.display}</Link>
                                     </ListGroupItem>
                                ))
                            }
                        </ListGroup>
                    </div>
                </Col>
                <Col  lg='2' md='4' sm='6'>
                <div className='mb-4'>
                    <h5 className="footer__link-title">Contact Us</h5>
                    <p className='office__info'>RENT N ROLL Kochi</p>
                    <p className='office__info'>Phone: +91 8898878928</p>
                    <p className='office__info'>e-mail: rentnroll@gmail.com</p>
                </div>
                </Col>
                <Col lg='3' md='4'>
                <div className='mb-4'>
                    <h5 className='footer__link-title'>News Letter</h5>
                    <p className='section__description'>Subscribe our news letter </p>
                    <div className='newsletter'>
                            <input type='email' placeholder='Email'></input>
                            <span>
                                <i className='ri-send-plane-line'></i>
                            </span>
                    </div>
                </div>    
                </Col>
                <Col lg='12'>
                    <div className='footer__bottom'>
                        <p className='section__description d-flex align-items-center justify-content-center gap-1 padding-top-4'>
                            <i class='ri-copyyright-line'></i>
                            Copyright @ RENT N ROLL KOCHI. All rights reserved.
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>



    </footer>
  )
}

export default Footer
