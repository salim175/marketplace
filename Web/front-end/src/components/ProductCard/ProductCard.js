import React, { Component } from 'react';
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class ProductCard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: this.props.product.name,
            price: this.props.product.price,
            location: this.props.product.location,
            images: this.props.product.files,
            id: this.props.product._id,
            currency: this.props.product.currency_id.abr
        }
    }

    render()
    {
        return (
            <div className='container'>
                <Card>
                    <Link to={{
                        pathname: `/categories/details`,
                        state: { product: this.props.product }
                    }}>
                        <Card.Img variant="top" src={require(`../../WebsiteData/Products_Pictures/${this.state.id}/${this.state.images[0]}`)} />
                        <Card.Body >
                            <Card.Title>{this.state.name}</Card.Title>
                            <Card.Text>{`${this.state.price} ${this.state.currency}`}</Card.Text>
                        </Card.Body>
                    </Link>
                    <Card.Footer>
                        <small className="text-muted">
                            <Card.Text>{this.state.location}</Card.Text>
                        </small>
                    </Card.Footer>
                </Card >
            </div>
        );
    }
}

export default ProductCard;