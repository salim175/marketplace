import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';
import { RiMessage3Fill } from 'react-icons/ri';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md';
import { ImLocation } from "react-icons/im";
import profile_picture from "../../../Images/profile-picture.png"

import './Aside.css';

class Aside extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { product: this.props.product }
    }
    render()
    {
        return (
            <aside>
                <div className="product-details-seller">
                    <div id="priceLabel" className="col-lg-12">
                        <h4 id="product-price-heading">Product Price: </h4>
                        <h4 id="product-price-heading">{this.state.product.price} {this.state.product.currency_id.abr}</h4>
                    </div><br />
                    <Col lg={12}>
                        <img id="avatar" src={profile_picture} alt="user-avatar" />
                    </Col>
                    <Col lg={12}>
                        <p><BsFillPersonFill /> {this.state.product.owner_id.name} </p>
                        <a href={`mailto:${this.state.product.owner_id.email}`}>
                            <p><MdEmail /> {this.state.product.owner_id.email} </p>
                        </a>
                        <p><MdPhoneAndroid /> {this.state.product.owner_id.phoneNumber}</p>
                        <p><ImLocation /> {this.state.product.owner_id.address}</p>
                    </Col>
                    <a href={`https://wa.me/${this.state.product.owner_id.phoneNumber}`} target="_blank" >
                        <Button variant="dark" className="col-lg-10" id="btnContact" >
                            <RiMessage3Fill />Contact Seller
                        </Button>
                    </a>
                </div>
            </aside>
        );
    }
}

export default Aside;