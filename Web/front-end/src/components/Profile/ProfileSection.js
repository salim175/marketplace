import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail, MdPhoneAndroid } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { ImLocation } from "react-icons/im";
import { getUser } from '../../Services/userData';

class ProfileSection extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: "",
            email: "",
            phoneNumber: "",
            address: ""
        }
    }

    componentDidMount()
    {
        getUser()
            .then(res =>
            {
                this.setState(
                    {
                        name: res.name,
                        email: res.email,
                        phoneNumber: res.phoneNumber,
                        address: res.address
                    }
                )
            })
            .catch(e => { console.log(e) });
    }

    render()
    {
        return (
            <div id="profile-head">
                <div className="container">
                    <Row className="profile-row">
                        <Col lg={3} md={3} sm={12} >
                            <p><BsFillPersonFill /> {this.state.name}</p>
                            <p><MdEmail /> {this.state.email}</p>
                            <p><MdPhoneAndroid /> {this.state.phoneNumber}</p>
                            <p><ImLocation />{this.state.address}</p>
                        </Col>

                        <span id="edit-icon">
                            <Link to={`/profile/edit`}><GrEdit /></Link>
                        </span>
                    </Row>
                </div>
            </div>
        );
    }
}

export default ProfileSection;