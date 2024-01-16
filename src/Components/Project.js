import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { projectIdContext } from '../Contexts/ProjectId'
import axios from 'axios';
import NavMain from '../NavComps/NavMain'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from 'react-bootstrap/esm/Button';
import Typography from '@mui/material/Typography';
import Container from 'react-bootstrap/esm/Container';
import '../CSS/Project.css'
import Modal from 'react-bootstrap/Modal';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import ModalStory from './ModalStory';






const Project = () => {

    const [projectId, setProjectId] = useContext(projectIdContext)
    const BASE_URL = 'http://localhost:3003/api';
    const [project, setProject] = useState(null)
    const [show, setShow] = useState(false);
    const [initials, setInitials] = useState([])
    const [contributors, setContributors] = useState([])
    const authToken = localStorage.getItem('token');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState({
        Email: ''
    })

    const [showStory, setShowStory] = useState(false);

    
    const handleStoryShow = () => setShowStory(true);
    const handleStoryClose = () => setShowStory(false);




    useEffect(() => {
        async function fetchProject() {
            try {

                const response = await axios.get(`${BASE_URL}/project/${projectId}`)

                setProject(response.data.project)
                console.log(response.data.project)
                const initialsArr = response.data.project.AccessedBy.map((initials) => {
                    return initials.Name.substring(0, 2)
                })
                setContributors(response.data.project.AccessedBy)
                setInitials(initialsArr)


            } catch (error) {

                console.log(error)

            }
        }

        fetchProject()
    }, [project])

    async function ContributorHandler() {
        const response = await axios.post(`${BASE_URL}/addUser/${project._id}`, { Email: email.Email }, {
            headers: {
                'auth-token': authToken
            }
        })

        handleClose()

        alert(response.data)


    }

    async function removeContributor(email) {
        try {
            const response = await axios.post(
                `${BASE_URL}/removeUser/${project._id}`,
                { Email: email }, // Send the email as part of the request body
                {
                    headers: {
                        'auth-token': authToken
                    }
                }
            );

            handleClose();

            alert(response.data);
        } catch (error) {
            console.error('Error while removing contributor:', error);
        }
    }



    function changeHandler(e) {
        setEmail({ ...email, [e.target.name]: e.target.value })
    }
    return (
        <div>

            <NavMain />
            <Container className='mt-1 d-flex justify-content-center flex-column align-items-center'>
                {project && ( // Add a null check before accessing project.Name
                    <Card sx={{ minWidth: '90vw', minHeight: '30vh', marginTop: '3%' }}>
                        <CardContent>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography id='Name' gutterBottom variant="h5" component="div">
                                    {project.Name}
                                </Typography>

                                <Typography id='stories' gutterBottom variant="h5" component="div" sx={{ display: 'inline-block', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', borderRadius: '3px' }}>
                                    Stories: <span>{project.Data.length}</span>
                                </Typography>
                            </div>
                            <span style={{ display: 'inline-block', maxWidth: '120px', border: '1px solid abc4d6', backgroundColor: '#abc4d6', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', borderRadius: '10px' }}>{project.ProjectID}</span>
                            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '50vw' }}>
                                <b><i>{project.Description}</i></b>
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ marginLeft: '10px', display: 'flex', justifyContent: 'space-between' }}>

                            <div>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Contributors</Tooltip>} placement="bottom">

                                    <i class="fa-solid fa-user-plus" onClick={handleShow} style={{ cursor: 'pointer', marginRight: '10px' }}></i>

                                </OverlayTrigger>



                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Story</Tooltip>} placement="bottom">
                                    <i class="fa-solid fa-rectangle-list" style={{ cursor: 'pointer' }} onClick={handleStoryShow} ></i>
                                </OverlayTrigger>
                            </div>

                            <div>

                                <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {initials && initials.length <= 3 ? (
                                        initials.map((initials) => (
                                            <Avatar sx={{ bgcolor: deepOrange[500] }}>{initials}</Avatar>
                                        ))
                                    ) : (
                                        <p id='fetchpara'>No Contributors</p>
                                    )}
                                </Stack>

                            </div>





                        </CardActions>
                    </Card>
                )}
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="modaltitle">Add Contributor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TextField

                        id="outlined-required"
                        label="Enter Contributor's Mail Id"
                        sx={{ width: '100%' }}
                        name='Email'
                        onChange={changeHandler}
                    />
                    <i class="fa-solid fa-paper-plane" id="send" style={{ position: 'absolute', top: '35px', right: '40px', cursor: 'pointer' }} onClick={ContributorHandler}></i>

                </Modal.Body>
                <div>
                    {
                        contributors.map((contributor) => {
                            return (
                                <span style={{ backgroundColor: '#abc4d6', margin: '15px', color: 'white', fontWeight: 'bold', borderRadius: '10px' }}>
                                    {contributor.Email}
                                    <span style={{ marginLeft: '5px' }}><i class="fa-solid fa-user-minus" style={{ color: '#CD5C5C', cursor: 'pointer' }} onClick={() => removeContributor(contributor.Email)}></i>
                                    </span>
                                </span>
                            )
                        })
                    }
                </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} id="close">
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
            <ModalStory show={showStory} handleClose={handleStoryClose} developers={contributors} projectId={projectId}/>

        </div>
    )
}

export default Project