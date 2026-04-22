import { Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminCards(props)
{
    return (
        <Card style={{ justifyContent: "center", margin: "50px" }}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.text}
                </Card.Text>
                <Button variant="primary" onClick={props.handleClick}>Sow more</Button>
            </Card.Body>
        </Card>
    )
}

export default AdminCards;