import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import SimpleSider from '../components/Siders/SimpleSider';
// import From user Data
import { Col, Row, Button, OverlayTrigger, Tooltip, Spinner, Alert, Form } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import { AiFillCloseSquare } from 'react-icons/ai';
import { ImLocation } from "react-icons/im";
import { editUserProfile, getUser } from '../Services/userData';

import Joi from "@hapi/joi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class EditProfile extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            errors: "",
            name: "",
            email: "",
            phoneNumber: "",
            address: ""
        }
    }

    validateUser(user)
    {
        const schema = Joi.object({
            name: Joi.string().min(3).max(50)
                .error(() =>
                {
                    return new Error("Please enter a Valide name(the name must be between 3 and 50 character)")
                }),
            email: Joi.string().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                .error(() =>
                {
                    return new Error("Please enter a valide email")
                }),
            phoneNumber: Joi.string().regex(/^(03|70|71|76|81|78|79|86)\d{6}$/)
                .error(() =>
                {
                    return new Error("Please enter a valide phoneNumber(the phoneNumber must be 8 numbers)")
                }),
            address: Joi.string().min(20).max(250)
                .error(() =>
                {
                    return new Error("Please enter a valide address(the address must be between 20 and 250 character)")
                })
        });
        return schema.validate(user);
    }

    validateData(profileEdit)
    {
        const { error } = this.validateUser(profileEdit);
        if (error)
        {
            this.setState({ errors: error.message });
            return false;
        }
        return true;
    }

    // applyChanges()
    // {
    //     editUserProfile(this.state)
    //         .then(res => { console.log(res.message); res.status == 200 ? toast.success("Edit succesfully") : toast.error(`ERROR occured while editing profile`); })
    //         .catch(e => { toast.error("ERROR"); });

    // }

    handleSubmit()
    {
        const profileToSubmit = {
            name: this.state.name,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address
        }
        if (this.validateData(profileToSubmit))
        {
            editUserProfile(profileToSubmit)
                .then((res) =>
                {
                    if (res.status == 200)
                    {
                        toast.success("Edit succesfully");
                    }
                    else
                    {
                        toast.error(`ERROR occured while editing profile`);
                    }
                })
                .catch(() => { toast.error(`ERROR occured while editing profile`); })
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
            <>
                <Header />
                <SimpleSider />
                <h1 style={{ textAlign: "center", fontFamily: "serif" }}>Edit Profile</h1>
                <div id='profile-head'>
                    <div className='container'>
                        <form className='col-lg-12'>
                            <Row className='profile-row'>
                                <Col lg={4} md={6} sm={12}>

                                    <p><BsFillPersonFill /> <input
                                        type="text"
                                        name="name"
                                        value={this.state.name}
                                        style={{ width: "300px" }}
                                        onChange={e =>
                                        {
                                            this.setState({
                                                name: e.target.value
                                            })
                                        }}
                                        required /></p>
                                    <p><MdEmail /> <input
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        style={{ width: "300px" }}
                                        onChange={e =>
                                        {
                                            this.setState({
                                                email: e.target.value
                                            })
                                        }}
                                        required /></p>
                                    <p><MdPhoneAndroid /> <input
                                        type="text"
                                        name="phoneNumber"
                                        value={this.state.phoneNumber}
                                        style={{ width: "300px" }}
                                        onChange={e =>
                                        {
                                            this.setState({
                                                phoneNumber: e.target.value
                                            })
                                        }}
                                        required /></p>
                                    <p><ImLocation /> <input
                                        type="text"
                                        name="address"
                                        value={this.state.address}
                                        style={{ width: "300px" }}
                                        onChange={e =>
                                        {
                                            this.setState({
                                                address: e.target.value
                                            })
                                        }}
                                        required /></p>

                                </Col>

                            </Row>

                            <Col lg={12} id="edit-profile-icons">
                                <OverlayTrigger placement="bottom"
                                    overlay={<Tooltip> Save changes</Tooltip>}
                                >
                                    <span onClick={() => { this.handleSubmit() }} ><TiTick /></span>
                                </OverlayTrigger>

                                <Link to="/profile">
                                    <OverlayTrigger placement="bottom"
                                        overlay={<Tooltip>Discard changes </Tooltip>}
                                    >
                                        <span ><AiFillCloseSquare /></span>
                                    </OverlayTrigger>
                                </Link>
                            </Col>

                            <Row>
                                <Col style={{ textAlign: "center" }}>
                                    {this.state.errors ?
                                        <Form.Group>
                                            <Form.Label>
                                                <Alert variant="danger" style={{ marginLeft: "10px" }}>{this.state.errors}</Alert>
                                            </Form.Label>
                                        </Form.Group>
                                        :
                                        <></>
                                    }
                                </Col>
                            </Row>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default EditProfile;