import React, { Component } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md';

import { RiMessage3Fill } from 'react-icons/ri';

class SellerProfile extends Component
{
    constructor(props)
    {
        super(props);
    }
    state = {}
    render()
    {
        return (
            <>
                <div id="profile-head">
                    <div className='container'>
                        <Row className='profile-row'>
                            <Col lg={2} md={3} sm={12}>
                                <p><BsFillPersonFill />name</p>
                                <p><MdEmail />email</p>
                                <p><MdPhoneAndroid />phoneNumber</p>
                            </Col>
                            <Col lg={3} md={4} sm={12}>
                                <a href='//www.whatsapp.com'>
                                    <Button variant="dark" className="col-lg-10" id="btnContact" >
                                        <RiMessage3Fill />Contact Seller
                                    </Button>
                                </a>
                            </Col>
                        </Row>
                    </div>
                </div>
            </>
        );
    }
}

export default SellerProfile;