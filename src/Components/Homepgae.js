import React, { useEffect, useState,useContext } from 'react';
import NavMain from '../NavComps/NavMain';
import Container from 'react-bootstrap/Container';
import addProject from '../Assets/addProject.png';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import ModalComp from './ModalComp';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/Homepage.css'
import ModalCompUpd from './ModalCompUpd';

import { useNavigate } from 'react-router-dom';
import { projectIdContext } from '../Contexts/ProjectId';


const Homepgae = () => {
  const [projects, setProjects] = useState([]);
  const BASE_URL = 'http://localhost:3003/api';
  const authToken = localStorage.getItem('token');
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showUpd, setShowUpd] = useState(false);
  const [projectCred, setProjectCred] = useState();
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [initials,setInitials] = useState('')
  const [projectId,setProjectId] = useContext(projectIdContext)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpdClose = () => setShowUpd(false);
  const handleUpdShow = (id) => {
    setShowUpd(true);
    for (var i = 0; i < projects.length; i++) {
      if (id === projects[i]._id) {
        setProjectCred(projects[i]);
      }
    }
  };

  const handleDeleteModalClose = () => setDeleteModalShow(false);
  const handleDeleteModalShow = (projectId) => {
    setProjectToDelete(projectId);
    setDeleteModalShow(true);
  };

  
  useEffect(()=>{
    async function fetchUser(){
      try{

        const response = await axios.get(`${BASE_URL}/user`,{
          headers: {
            'auth-token' : authToken
          }
        })

        setInitials(response.data.loggedInUser.Name.substr(0,2).toUpperCase())

      }catch(error){

        console.log(error)

      }
    }

    fetchUser()
  },[])

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get(`${BASE_URL}/projects`, {
          headers: {
            'auth-token': authToken
          }
        });
        setProjects(response.data.projectsCreatedByTheUser);
      } catch (e) {
        console.log(e);
      }
    }
    fetchProjects();
  }, [authToken]);

  async function updateProjects() {
    try {
      const response = await axios.get(`${BASE_URL}/projects`, {
        headers: {
          'auth-token': authToken
        }
      });
      setProjects(response.data.projectsCreatedByTheUser);
    } catch (e) {
      console.log(e);
    }
  }

  async function DeleteProject(id) {
    try {
      const response = await axios.delete(`${BASE_URL}/project/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      });
      updateProjects();
    } catch (e) {
      console.log(e);
    }
  }

  function ProjectRouteHandler(id,mongoId){

    setProjectId(mongoId)
    
    navigate(`/project/${id}`)
  }


  return (
    <div>
      <NavMain initials={initials}/>
      {/* <h1>{initials}</h1> */}
      {projects.length === 0 ? (
        <Container style={{ textAlign: 'center', marginTop: '5%' }}>
          <div>
            <img src={addProject} alt='add a project' />
          </div>
          <div className="mt-3">
            <Button variant="dark" style={{ borderRadius: '20px' }} onClick={handleShow}>
              Start A Project
            </Button>
          </div>
        </Container>
      ) : (
        <>

          <Container style={{ textAlign: 'center' }} className='mt-3'>
            <Button variant="dark" style={{ borderRadius: '20px' }} onClick={handleShow} >
              
              <i className="fa-solid fa-plus"></i>
            </Button>
          </Container>
          {projects.map((project) => (
            <Container key={project._id} className='mt-1 d-flex justify-content-center flex-column align-items-center'>
              <Card sx={{ display: 'flex', marginTop: '3%', marginBottom: '10px', width: '50vw', height: '200px', cursor: 'pointer' }} onClick={()=>ProjectRouteHandler(project.ProjectID,project._id)}>
                <Container>
                  <Row>
                    <Col lg={9} md={8} sm={12} xs={12}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
                          <Typography component="div" variant="h5">
                            {project.Name}
                            <span> <i className="fa-solid fa-pen-to-square" style={{ fontSize: '20px', marginRight: '10px' }} onClick={(e) =>{e.stopPropagation(); handleUpdShow(project._id)}}></i></span>
                            <span><i className="fa-solid fa-trash" style={{ fontSize: '20px' }} onClick={(e) =>{e.stopPropagation(); handleDeleteModalShow(project._id)}}></i></span>
                          </Typography>
                          <span style={{ display: 'inline-block', maxWidth: '120px', border: '1px solid abc4d6', backgroundColor: '#abc4d6', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', borderRadius: '10px' }}>{project.ProjectID}</span>
                          <h6 style={{ opacity: '0.5' }}>
                            {project.Date}
                          </h6>
                        </div>
                        <p className='Description' style={{ fontFamily: 'Lato, sans-serif', fontWeight: 'bolder' }}>
                          <b><i>{project.Description}</i></b>
                        </p>
                      </CardContent>
                    </Col>
                    <Col lg={3} md={4} sm={12} xs={12}>
                      <CardMedia
                        component="img"
                        sx={{ width: 151, height: 200, position: 'relative', left: '0' }}
                        image="https://w7.pngwing.com/pngs/641/837/png-transparent-computer-icons-project-management-icon-design-program-management-automation-blue-text-trademark.png"
                        alt="Live from space album cover"
                      />
                    </Col>
                  </Row>
                </Container>
              </Card>
            </Container>
          ))}
        </>
      )}
      <ModalComp show={show} handleClose={handleClose} updateProjects={updateProjects} />
      <ModalCompUpd show={showUpd} handleClose={handleUpdClose} updateProjects={updateProjects} projectCredUpd={projectCred} />

      
      <Modal show={deleteModalShow} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this project?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => {
            DeleteProject(projectToDelete);
            handleDeleteModalClose();
          }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Homepgae;
