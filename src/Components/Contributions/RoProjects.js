import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { projectIdContext } from '../../Contexts/ProjectId';
import axios from 'axios';
import NavMain from '../../NavComps/NavMain';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from 'react-bootstrap/esm/Button';
import Typography from '@mui/material/Typography';
import Container from 'react-bootstrap/esm/Container';
import '../../CSS/Project.css'
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import ModalStory from '../ModalStory';
import Table from 'react-bootstrap/Table';
import { StoryContext } from '../../Contexts/StoryId';
import { useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';






const RoProjects = () => {

    const [projectId, setProjectId] = useContext(projectIdContext)
    const [storyId, setStoryId] = useContext(StoryContext)
    const BASE_URL = 'https://projecto-ha1h.onrender.com/api';
    const [project, setProject] = useState(null)
    const [show, setShow] = useState(false);
    const [storyIndex, setStoryIndex] = useState(null)
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
    const navigate = useNavigate()
    const [identity, setIdentity] = useState('')
    const [showDelete, setShowDelete] = useState(false);
    const [user,setUser] = useState('')
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (id) => {

        setShowDelete(true);
        setStoryIndex(id)

    }

    const [checked,setChecked] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;



    const totalPages = project ? Math.ceil(project.Data.length / itemsPerPage) : 0;


    useEffect(() => {
        async function fetchUser() {
            try {

                const response = await axios.get(`${BASE_URL}/user`, {
                    headers: {
                        'auth-token': authToken
                    }
                })

                console.log(response.data)

                setIdentity(response.data.loggedInUser.Name.substr(0, 2).toUpperCase())
                setUser(response.data.loggedInUser.Email)

            } catch (error) {

                console.log(error)

            }
        }

        fetchUser()
    }, [])



    useEffect(() => {
        async function fetchProject() {
            try {

                const response = await axios.get(`${BASE_URL}/project/${projectId}`)

                setProject(response.data.project)
                
                const initialsArr = response.data.project.AccessedBy.map((initials) => {
                    return initials.Name.substring(0, 2)
                })
                setContributors(response.data.project.AccessedBy)
                setInitials(initialsArr)


            } catch (error) {

                console.log(error)

            }
        }

        if (projectId) {
            fetchProject();
        }
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

    function storyRedirect(mongoId, storyId) {

        setStoryId(mongoId)
        navigate(`/rostory/${storyId}`)

    }

    function changeHandler(e) {
        setEmail({ ...email, [e.target.name]: e.target.value })
    }

    async function handleStoryDelete() {
        try {

            const response = await axios.delete(`${BASE_URL}/project/${projectId}/${storyIndex}`, {
                headers: {
                    'auth-token': authToken
                }
            })
            setProject(response.data.updatedProject)
            handleCloseDelete()

        } catch (e) {
            console.log(e)
        }
    }

    const displayedStories = project?.Data ? project.Data.slice(startIndex, endIndex) : [];

    useEffect(() => {
        if (displayedStories.length === 0 && currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    }, [displayedStories, currentPage]);



    return (
        <div>

            <NavMain initials={identity} />

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
            <ModalStory
                show={showStory}
                handleClose={handleStoryClose}
                developers={contributors}
                projectId={projectId}
            />

            <Container style={{ marginTop: '80px' }}>

                <Container style={{textAlign: 'center'}}>

                <FormControlLabel control={<Switch defaultChecked={checked}/>} label={checked ? "Remove Highlight" : "Highlight Your Stories"} onClick={()=>setChecked(!checked)}/>

                </Container>

            

                {
                    (project && project.Data.length > 0 && displayedStories.length > 0) ? (
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Story ID</th>
                                    <th>Title</th>
                                    <th>Developer</th>
                                    <th>Status</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    displayedStories.length > 0 ? displayedStories.map((story,index) => {
                                        return (

                                            <tr style={{ border: (story.Developer == user && checked=== true) && '1px solid green',borderTop: index === 0 && story.Developer === user && '1px solid green', zIndex: '4' }}>
                                                <td>{story.StoryId}</td>
                                                <td>{story.Title}</td>
                                                <td>{story.Developer}</td>
                                                <td>{story.Status}</td>
                                                <td>
                                                    <span>
                                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">View This Story</Tooltip>} placement="bottom">
                                                            <i class="fa-regular fa-eye" style={{ cursor: "pointer", fontSize: '20px', color: 'blue' }} onClick={() => storyRedirect(story._id, story.StoryId)}></i>
                                                        </OverlayTrigger>
                                                    </span>



                                                </td>
                                            </tr>

                                        )
                                    }) : null
                                }




                            </tbody>
                        </Table>


                    ) : null
                }

                {totalPages > 1 && (
                    <Pagination>
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                )}









            </Container>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this story?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleStoryDelete} o>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>



        </div>
    )
}

export default RoProjects;
