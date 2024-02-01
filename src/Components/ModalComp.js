import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

function ModalComp({ show, handleClose,updateProjects }) {

    const BASE_URL = 'https://projecto-ha1h.onrender.com/api'
    const authToken = localStorage.getItem('token')
    
    const [projectCred,setProjectCred] = useState({
        Name: '',
        Description: ''
    })

    function changeHandler(e){
        const {name,value} =e.target;
        setProjectCred({...projectCred,[name] : value})
    }
  
   async function createProject(){

        const response = await axios.post(`${BASE_URL}/createproject`,projectCred,{
            headers: {
                'Content-Type': 'application/json',
                "auth-token": authToken 
              },
        })

        updateProjects()

        console.log(response.data)
        handleClose()
        setProjectCred({
            Name: '',
            Description: ''
        })
    }

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create A New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Project Name"
                        className="mb-3"
                    >
                        <Form.Control as="textarea" placeholder="Project Name" onChange={changeHandler} value={projectCred.Name} name='Name' />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea2" label="Description">
                        <Form.Control
                            as="textarea"
                            placeholder="Enter Project Description"
                            style={{ height: '100px' }}
                            onChange={changeHandler}
                            value={projectCred.Description}
                            name='Description'
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={createProject}>
                       Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalComp;