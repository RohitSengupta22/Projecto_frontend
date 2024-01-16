import React, { useState, useEffect } from 'react';
import NavLandingpage from '../NavComps/NavLandingpage';
import '../CSS/Landingpage.css';
import vector from '../Assets/Projecto1.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardComp from './CardComp';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Landingpage = () => {
  const [heading, setHeading] = useState('');
  const text = "Empower Your Projects with Projecto";


  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index <= text.length) {
        setHeading(text.substring(0, index) + '|');
        index++;
      } else {
        setHeading(text)
        clearInterval(interval);
      }
    }, 100); // Adjust the timing here (milliseconds per letter)

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration
      once: true, // Whether animation should happen only once
      easing: 'ease-out-back', // Animation easing
    });
  }, []);

  return (
    <div>
      <NavLandingpage />
      <div style={{ marginTop: '5%' }}>
        <h1 id='heading1'><b>{heading}</b></h1>
        <div style={{ textAlign: 'center' }}>
          <img src={vector} alt='vector' width="500" height="500" id='vector1' />
        </div>
        <Container id='Uses'>
          <Row className="justify-content-center" data-aos="zoom-in">
            <Col lg={6} md={6} sm={12} xs={12}><CardComp source="https://img.freepik.com/premium-vector/hands-programming-app-engineering-apps-ui-hand-creating-build-application-creative-team-creation-work-project-web-designer-utter-vector-concept_53562-17495.jpg?w=2000" title="Multiple Projects" Desc="Create multiple projects on the projecto webapp"/></Col>
            <Col lg={6} md={6} sm={12} xs={12}><CardComp source="https://www.netsolutions.com/insights/wp-content/uploads/2023/02/Agile-User-Stories.png.webp" title="Stories" Desc="Create multiple stories within the projecto webapp"/></Col>
          </Row>
          <Row className="justify-content-center" data-aos="zoom-in">
          <Col lg={6} md={6} sm={12} xs={12}><CardComp source="https://cdn-blog.novoresume.com/articles/web-developer-resume/bg.png" title="Assign developer" Desc="You can assign developers to each story within a project"/></Col>
            <Col lg={6} md={6} sm={12} xs={12}><CardComp source="https://media.istockphoto.com/id/1227008537/vector/project-management.jpg?s=612x612&w=0&k=20&c=XgyOQJ7B6b0bLGMjGs3J8-LS5e2KSVq89Nqcar1eJWc=" title="Crud operations" Desc="Create, read, update or delete projects as well as stories"/></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Landingpage;
