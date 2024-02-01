import { useState,useContext, useEffect,useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { StoryContext } from '../Contexts/StoryId';
import { projectIdContext } from '../Contexts/ProjectId'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Container } from '@mui/material';
import Card from 'react-bootstrap/Card';


function Comments({ show, handleClose,story }) {

    const [projectId, setProjectId] = useContext(projectIdContext)
    const [storyId, setStoryId] = useContext(StoryContext)
    const [comments,setComments] = useState([])
    const [user,setUser] = useState('')
    const curr = useRef()
    const authToken = localStorage.getItem('token');
    const BASE_URL = 'https://projecto-ha1h.onrender.com/api';

    const [comment, setComment] = useState({

        comment: ''

    })

    useEffect(()=>{
        async function fetchUser(){
          try{
    
            const response = await axios.get(`${BASE_URL}/user`,{
              headers: {
                'auth-token' : authToken
              }
            })
    
            setUser(response.data.loggedInUser.Email)
    
          }catch(error){
    
            console.log(error)
    
          }
        }
    
        fetchUser()
      },[])

    useEffect(() => {
        async function fetchStory() {
          try {
    
            const response = await axios.get(`${BASE_URL}/story/${projectId}/${storyId}`)
    
            setComments(response.data.story.Comments)
    
    
    
          } catch (error) {
    
            console.log(error)
    
          }
        }
    
        if (projectId && storyId) {
          fetchStory();
        }
      }, [])
    


    function changeHandler(e) {
        setComment({ ...comment, [e.target.name]: e.target.value })
    }

    async function commentHandler() {

        if(comment.comment===''){
            alert('post a valid comment')
           
        }else{

            try {

                const response = await axios.post(`${BASE_URL}/comment/${projectId}/${storyId}`,{comment: comment.comment},{
                    headers: {
                        'auth-token' : authToken
                      }
                })
                setComments(response.data.story.Comments)
                setComment({
                    comment: ''
                })
    
    
    
            } catch (e) {
                console.log(e)
            }

        }
       
    }

    async function dltComment(id){
        try{

            const response = await axios.delete(`${BASE_URL}/comment/${projectId}/${storyId}/${id}`,{
                headers: {
                    'auth-token' : authToken
                  }
            })

            setComments(response.data.story.Comments)

        }catch(e){
            console.log(e)
        }
    }

   
    

   


    return (
        <>


            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Comments</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <FloatingLabel controlId="floatingTextarea2" label="Post Your Comment">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            onChange={changeHandler}
                            name='comment'
                            value={comment.comment}
                        />
                    </FloatingLabel>
                    <Button variant="primary" style={{ marginTop: '10px', width: '100%' }} onClick={commentHandler} ref={curr}>Post</Button>{' '}
                    <Container>
                        {
                          comments &&  comments.map((comment) =>{
                                return (
                                    <Card style={{ width: '100%',marginTop: '8px',boxShadow: '2px 2px 2px 2px grey' }}>
                                    <Card.Body>
                                      <Card.Title style={{fontWeight: 'Bold',fontSize: '15px'}}>{comment.user}<span>{comment.user==user ? <i class="fa-solid fa-delete-left" style={{marginLeft: '5px',color: 'red',cursor: 'pointer'}} onClick={()=>dltComment(comment._id)}></i> : null}</span></Card.Title>
                                      <Card.Subtitle className="mb-2 text-muted" style={{fontSize: '10px'}}>{comment.DateTime}</Card.Subtitle>
                                      <Card.Text>
                                       {comment.commentText}
                                      </Card.Text>
                                    </Card.Body>
                                  </Card>
                                )
                            })
                        }
                    </Container>

                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Comments;