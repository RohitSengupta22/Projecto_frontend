import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';

function ModalUpdStory({ show, handleClose, projectId,storyId }) {

    const [contributors, setContributors] = useState([])
    const BASE_URL = 'http://localhost:3003/api';
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
                setContributors(response.data.project.AccessedBy)
                


            } catch (error) {

                console.log(error)

            }
        }

        if (projectId) {
            fetchProject();
        }
    }, [])


     
    


    const [value, setValue] = useState(null);

    



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
                    <Modal.Title>Edit This Story</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Title"
                        className="mb-3"
                    >
                        <Form.Control as="textarea" placeholder="Enter The Story's Title" onChange={changeHandler} name='Title' value={storyCred && storyCred.Title} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea2" label="Description" className="mb-3">
                        <Form.Control
                            as="textarea"
                            placeholder="Enter The Story's Description "
                            style={{ height: '100px' }}
                            onChange={changeHandler}
                            name='Description'
                            value={storyCred && storyCred.Description}
                        />
                    </FloatingLabel>


                    <Form.Select aria-label="Default select example" className="mb-3" onChange={changeHandler} name='Developer' value={storyCred && storyCred.Developer}>
                        <option>Developer</option>
                        {
                            contributors.map((elem, index) => {
                                return (
                                    <option value={elem.Email}>{elem.Email}</option>
                                )
                            })
                        }


                    </Form.Select>

                    <Form.Select aria-label="Default select example" className="mb-3" onChange={changeHandler} name='Classification' value={storyCred && storyCred.Classification}>
                        <option>Story Classification</option>
                        <option value="UI">UI</option>
                        <option value="Backend">Backend</option>
                        <option value="R&D">R&D</option>
                    </Form.Select>

                    <Form.Select aria-label="Default select example" className="mb-3" onChange={changeHandler} name='Priority' value={storyCred && storyCred.Priority}>
                        <option>Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Form.Select>

                    <Form.Select aria-label="Default select example" className="mb-3" onChange={changeHandler} name='Status' value={storyCred && storyCred.Status}>
                        <option>Status</option>
                        <option value="Not Started">Not Started</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </Form.Select>



                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Select The Target Deadline"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                    setStoryCred({ ...storyCred, Deadline: newValue ? newValue.toString() : '' });
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>







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

export default ModalUpdStory;