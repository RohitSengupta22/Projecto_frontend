import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../CSS/NavLandingpageCss.css'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


const NavLandingpage = () => {

  const navigate = useNavigate()

  function NavigateHandler(){
    navigate('/login')
  }
  return (
    <Navbar expand="lg" id="custom-navbar"  className="bg-body-tertiary">
     <Container>
        <Navbar.Brand href="#home" id='brand'>
         Projecto
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Button variant="dark" onClick={NavigateHandler}>Log in</Button>
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
};

export default NavLandingpage;
