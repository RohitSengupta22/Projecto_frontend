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

function ModalStory({ show, handleClose, developers, projectId }) {

    const [contributors, setContributors] = useState([])
    const BASE_URL = 'http://localhost:3003/api';
    const authToken = localStorage.getItem('token');
    useEffect(() => {
        setContributors(developers)
    }, [developers])

    const [value, setValue] = useState(null);

    const [storyCred, setStoryCred] = useState({
        Title: '',
        Description: '',
        Developer: '',
        Classification: '',
        Deadline: value
    })

    function changeHandler(e) {
        const { name, value } = e.target;
        setStoryCred({ ...storyCred, [name]: value })
    }

    async function storyHandler() {

        const response = await axios.patch(`${BASE_URL}/projectdata/${projectId}`, storyCred, {
            headers: {
                'Content-Type': 'application/json',
                "auth-token": authToken
            },
        })
        console.log(response.data)
        handleClose()

    }





    return (
        <>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create A New Story</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Title"
                        className="mb-3"
                    >
                        <Form.Control as="textarea" placeholder="Enter The Story's Title" onChange={changeHandler} name='Title' />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea2" label="Description" className="mb-3">
                        <Form.Control
                            as="textarea"
                            placeholder="Enter The Story's Description "
                            style={{ height: '100px' }}
                            onChange={changeHandler}
                            name='Description'
                        />
                    </FloatingLabel>


                    <Form.Select aria-label="Default select example" className="mb-3" onChange={changeHandler} name='Developer'>
                        <option>Developer</option>
                        {
                            contributors.map((elem, index) => {
                                return (
                                    <option value={elem.Email}>{elem.Email}</option>
                                )
                            })
                        }


                    </Form.Select>

                    <Form.Select aria-label="Default select example" className="mb-3" onChange={changeHandler} name='Classification'>
                        <option>Story Classification</option>
                        <option value="UI">UI</option>
                        <option value="Backend">Backend</option>
                        <option value="R&D">R&D</option>
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

export default ModalStory;