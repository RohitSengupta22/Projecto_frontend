import React, { useEffect, useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavMain from '../NavComps/NavMain';
import Container from 'react-bootstrap/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Noprojects from '../Assets/No_projects.png';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { projectIdContext } from '../Contexts/ProjectId';
import axios from 'axios';

const Contributions = () => {
    const BASE_URL = 'https://projecto-ha1h.onrender.com/api';
    const authToken = localStorage.getItem('token');
    const [Roprojects, setRoProjects] = useState(null);
    const [projectId, setProjectId] = useContext(projectIdContext)
    const [identity,setIdentity] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        async function fetchUser(){
          try{
    
            const response = await axios.get(`${BASE_URL}/user`,{
              headers: {
                'auth-token' : authToken
              }
            })
    
            setIdentity(response.data.loggedInUser.Name.substr(0,2).toUpperCase())
    
          }catch(error){
    
            console.log(error)
    
          }
        }
    
        fetchUser()
      },[])

    useEffect(() => {
        async function fetchRoProjects() {
            const response = await axios.get(`${BASE_URL}/roprojects`, {
                headers: {
                    'auth-token': authToken
                }
            });

            setRoProjects(response.data.user.RoProjects);
        }

        fetchRoProjects();
    }, [Roprojects]);

    const renderProjects = () => {
        if (!Roprojects || Roprojects.length === 0) {
            return (
                <Container style={{ textAlign: 'center', marginTop: '5%' }}>
                    <div>
                        <img src={Noprojects} alt='add a project' style={{ maxWidth: '400px', maxHeight: '500px' }} />
                    </div>
                </Container>
            );
        }

        function projectHandler(mongoId,id){

            setProjectId(mongoId)
            navigate(`/roproject/${id}`)

        }

      

        return Roprojects.map((project) => (
            <Col lg={4} md={6} sm={12} xs={12} key={project._id} className='mb-3'>
                <Card sx={{ boxShadow: `0 0 5px 1px #673AB7`, cursor: 'pointer',width: '300px', height: '200px',margin: '30px auto' }} onClick={()=> projectHandler(project._id,project.ProjectID)}>
                    <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
                            <Typography component="div" variant="h5">
                                {project.Name}
                            </Typography>
                            <span style={{ display: 'inline-block', maxWidth: '120px', border: '1px solid #673AB7', backgroundColor: '#673AB7', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', borderRadius: '10px' }}>{project.ProjectID}</span>
                            <h6 style={{ opacity: '0.5' }}>
                                {project.Date}
                            </h6>
                        </div>
                        <p className='Description' style={{ fontFamily: 'Lato, sans-serif', fontWeight: 'bolder' }}>
                            <b><i>{project.Description}</i></b>
                        </p>
                    </CardContent>
                </Card>
            </Col>
        ));
    };

    return (
        <div>
            <NavMain initials={identity}/>

            <Container className='mt-1'>
                <Row>{renderProjects()}</Row>
            </Container>
        </div>
    );
};

export default Contributions;
