import React, { useState, useContext, useEffect } from 'react'
import NavMain from '../NavComps/NavMain'
import { StoryContext } from '../Contexts/StoryId';
import { projectIdContext } from '../Contexts/ProjectId'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from 'react-bootstrap/Tooltip';
import Typography from '@mui/material/Typography';
import Container from 'react-bootstrap/esm/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import ModalUpdStory from './ModalUpdStory';

const Stories = () => {

  const [projectId, setProjectId] = useContext(projectIdContext)
  const [storyId, setStoryId] = useContext(StoryContext)
  const [story, setStory] = useState(null)
  const BASE_URL = 'http://localhost:3003/api';
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    async function fetchStory() {
      try {

        const response = await axios.get(`${BASE_URL}/story/${projectId}/${storyId}`)

        setStory(response.data.story)



      } catch (error) {

        console.log(error)

      }
    }

    if (projectId && storyId) {
      fetchStory();
    }
  }, [story])


  return (
    <div>

      <NavMain />
      <Container className='mt-1 d-flex justify-content-center flex-column align-items-center'>
        {story && ( // Add a null check before accessing project.Name
          <Card sx={{ minWidth: '90vw', minHeight: '30vh', marginTop: '3%' }}>
            <CardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography id='Name' gutterBottom variant="h5" component="div">
                  {story.Title}
                </Typography>


                <span style={{ display: 'inline-block', maxWidth: '120px', height: '30px', border: '1px solid abc4d6', backgroundColor: story.Status === 'Not Started' ? 'red' : (story.Status === 'Doing' ? 'orange' : 'green'), color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', borderRadius: '5px' }}>{story.Status}</span>




              </div>
              <span style={{ display: 'inline-block', maxWidth: '120px', border: '1px solid abc4d6', backgroundColor: '#abc4d6', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', borderRadius: '5px' }}>{story.StoryId}</span>


              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '50vw' }}>
                <b>Developer: </b><i>{story.Developer}</i>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '50vw' }}>
                <b>Classification:</b> <i>{story.Classification}</i>
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '50vw' }}>
                <b>Created On: </b><i>{story.Date}</i>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '50vw' }}>
                <b>Deadline: </b><i>{story.Deadline}</i>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '50vw' }}>
                <b>Priority: </b><i>{story.Priority}</i>
              </Typography>
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit Story</Tooltip>} placement="bottom">
                <i class="fa-solid fa-pen-to-square" style={{ cursor: 'pointer' }} onClick={handleShow}></i>
              </OverlayTrigger>
            </CardContent>
            <CardActions sx={{ marginLeft: '10px', display: 'flex', justifyContent: 'space-between' }}>







            </CardActions>
          </Card>
        )}

        <ModalUpdStory show={show} handleClose={handleClose} projectId={projectId} storyId={storyId}/>

       


      </Container>

      <Container style={{marginTop: '5%',marginBottom: '3%'}}> 

      <FloatingLabel controlId="floatingTextarea2" label="Description">
          <Form.Control
            as="textarea"
            placeholder="Description"
            style={{ height: '50vh' }}
            value={story && story.Description}
            
          />
        </FloatingLabel>
        </Container>


    </div>
  )
}

export default Stories
