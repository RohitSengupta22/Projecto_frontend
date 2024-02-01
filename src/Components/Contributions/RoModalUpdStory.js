import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function RoModalUpdStory({ show, handleClose, projectId,storyId }) {

   
    const BASE_URL = 'https://projecto-ha1h.onrender.com/api';
    const authToken = localStorage.getItem('token');
    const [storyCred,setStoryCred] = useState(null)
   
    useEffect(() => {
        async function fetchStory() {
          try {
    
            const response = await axios.get(`${BASE_URL}/story/${projectId}/${storyId}`)
    
            setStoryCred({
                Title: response.data.story.Title,
                Description: response.data.story.Description,
                Developer:  response.data.story.Developer,
                Status: response.data.story.Status,
                Classification:  response.data.story.Classification,
                Priority:  response.data.story.Priority,
                Deadline: response.data.story.Deadline
            })
    
    
    
          } catch (error) {
    
            console.log(error)
    
          }
        }
    
        if (projectId && storyId) {
          fetchStory();
        }
      }, [])

      useEffect(() => {
        async function fetchProject() {
            try {

                const response = await axios.get(`${BASE_URL}/project/${projectId}`)
               
                


            } catch (error) {

                console.log(error)

            }
        }

        if (projectId) {
            fetchProject();
        }
    }, [])


     
    



    function changeHandler(e) {
        const { name, value } = e.target;
        setStoryCred({ ...storyCred, [name]: value })
    }

    async function storyHandler() {

        const response = await axios.patch(`${BASE_URL}/project/${projectId}/${storyId}`, storyCred, {
            headers: {
                'Content-Type': 'application/json',
                "auth-token": authToken
            },
        })

        setStoryCred(response.data.story)
        
        handleClose()

    }





    return (
        <>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    


        

                    <Form.Select aria-label="Default select example" className="mb-3" onChange={changeHandler} name='Status' value={storyCred && storyCred.Status}>
                        <option>Status</option>
                        <option value="Not Started">Not Started</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </Form.Select>







                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={storyHandler}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RoModalUpdStory;