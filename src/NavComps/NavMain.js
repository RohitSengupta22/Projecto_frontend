import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../CSS/NavLandingpageCss.css'
import Button from 'react-bootstrap/Button';
import { useNavigate,NavLink} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';


const NavMain = ({initials}) => {

    const navigate = useNavigate()

    function logoutHandler(){
        localStorage.removeItem('token')
        navigate('/')
    }


    return (
        <Navbar expand="lg" id="custom-navbar" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home" id='brand'>
                    Projecto
                </Navbar.Brand>
              
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/home"><b>Home</b></Nav.Link>
                        <Nav.Link as={NavLink} to='/contributions'><b>Contributions</b></Nav.Link>
                       
                        <Container style={{textAlign: 'center'}}><Avatar sx={{ bgcolor: deepPurple[500],width: 40, height: 40 }}>{initials}</Avatar></Container>
                        <i class="fa-solid fa-right-from-bracket" style={{position: 'relative', top: '15px',left: '20px',cursor: 'pointer'}} onClick={logoutHandler} id="logout"></i>


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavMain;
