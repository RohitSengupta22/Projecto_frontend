import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function ModalCompUpd({ show, handleClose, updateProjects, projectCredUpd }) {
  const BASE_URL = 'https://projecto-ha1h.onrender.com/api';
  const authToken = localStorage.getItem('token');
  const { _id, Name, Description } = projectCredUpd || {};

  const [projectId, setProjectId] = useState(_id || '');

  // Update projectId when projectCredUpd changes
  useEffect(() => {
    setProjectId(_id || '');
  }, [_id]);

  const [projectCred, setProjectCred] = useState(projectCredUpd || {
    Name: '',
    Description: '',
  });

 
  useEffect(() => {
    setProjectCred(projectCredUpd || { Name: '', Description: '' });
  }, [projectCredUpd]);

  function changeHandler(e) {
    const { name, value } = e.target;
    setProjectCred({ ...projectCred, [name]: value });
  }

  async function editProject() {
    const response = await axios.patch(`${BASE_URL}/project/${projectId}`, {
        Name: projectCred.Name,
        Description: projectCred.Description
    }, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
    });

    updateProjects();
    console.log(response.data);
    handleClose();
    setProjectCred({ Name: '', Description: '' });
  }



  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit This Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingTextarea" label="Project Name" className="mb-3">
            <Form.Control as="textarea" placeholder="Project Name" onChange={changeHandler} value={projectCred.Name} name="Name" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea2" label="Description">
            <Form.Control
              as="textarea"
              placeholder="Enter Project Description"
              style={{ height: '100px' }}
              onChange={changeHandler}
              value={projectCred.Description}
              name="Description"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={editProject}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCompUpd;
