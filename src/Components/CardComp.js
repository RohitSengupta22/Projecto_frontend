import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardComp({source,title,Desc}) {
  return (
    <Card style={{ width: '25rem',margin:'auto',marginBottom: '20px',boxShadow: '3px 3px grey'}}>
      <Card.Img variant="top" src={source} style={{height: '200px'}} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {Desc}
        </Card.Text>
       
      </Card.Body>
    </Card>
  );
}

export default CardComp;