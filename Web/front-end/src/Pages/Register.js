import { useState } from "react";
import Joi from "@hapi/joi";
import { Form, Button, Col, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { registerUser } from "../Services/userData";
import SimpleSider from "../components/Siders/SimpleSider";
import "../components/Register/Register.css"
import Header from "../components/Header/Header";

function Register({ history })
{
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [state, setState] = useState("")
    const [userData, setUserData] = useState({
        // errors: "",
        name: null,
        phoneNumber: '',
        email: "",
        password: "",
        address: "",
        dateOfBirth: "10-10-2000"
    });

    function validateUser(user)
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
                    return new Error(() =>
                    {
                        return new Error("Please enter a valide phoneNumber(the phoneNumber must be 8 numbers)")
                    })
                }),
            address: Joi.string().min(20).max(250)
                .error(() =>
                {
                    return new Error("Please enter a valide address(the address must be between 20 and 250 character)")
                }),
            password: Joi.string().min(8)
                .error(() =>
                {
                    return new Error("Please enter a valide password(the password must be between 8 and 20 character)")
                })
        });

        return schema.validate(user);
    }

    const handleChanges = (e) =>
    {
        e.preventDefault();
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleSubmitReg = (e) =>
    {
        e.preventDefault();
        console.log(userData);
        setLoading(true);
        registerUser(userData)
            .then(res =>
            {
                if (res.status === 201)
                {
                    history.push('/auth/login');
                } else
                {
                    setLoading(false);
                    setError(res.error);
                    setAlertShow(true);
                }
            }).catch(err => console.log('error from Register:', err));
    }

    return (
        <>
            <Header />
            <SimpleSider />
            <div className="container auth-form">
                <h1 className="auth-heading">Sign Up</h1>
                <Form className="col-lg-8" onSubmit={handleSubmitReg}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                Something wrong while Sign up
                            </p>
                        </Alert>
                    }
                    <Form.Row>
                        <Form.Group controlId="forName" className="col-lg-12">
                            <Form.Label>Name *</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Enter your name" onChange={handleChanges} required />
                            <Form.Text muted>
                                The name can be your real one or a username(the name must be between 3 and 50 character).
                            </Form.Text>
                        </Form.Group>

                        {/* <Form.Group controlId="formGridGender" className="col-lg-4">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" name="gender" onChange={handleChanges}>
                                <option>male</option>
                                <option>female</option>
                            </Form.Control>
                        </Form.Group> */}
                    </Form.Row>

                    <Form.Row>
                        <Form.Group className="col-lg-12">
                            <Form.Label>Phone Number *</Form.Label>
                            <Form.Control type="text" name="phoneNumber" placeholder="Enter your phoneNumber" onChange={handleChanges} required />
                            <Form.Text muted>
                                Phone Number should be 8 number.
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group className="col-lg-12">
                            <Form.Label>Address *</Form.Label>
                            <Form.Control type="address" name="address" placeholder="Your address" onChange={handleChanges} required />
                            <Form.Text muted>
                                Address should be minimum 20 characters.
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group controlId="formBasicEmail" className="col-lg-12">
                            <Form.Label>Email address *</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter your email" onChange={handleChanges} required />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group controlId="formBasicPassword" className="col-lg-6">
                            <Form.Label>Password *</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Enter your password" onChange={handleChanges} required />
                            <Form.Text muted>
                                Your password must be 8-20 characters long
                            </Form.Text>
                        </Form.Group>

                        {/* <Form.Group className="col-lg-6">
                            <Form.Label>Reepeat Password *</Form.Label>
                            <Form.Control type="password" name="repeatPassword" placeholder="Repeat password" onChange={handleChanges} required />
                        </Form.Group> */}
                    </Form.Row>

                    {/* {state.errors ?
                        < Form.Row >
                            <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                                <p>
                                    Something Wrong
                                </p>
                            </Alert>
                        </Form.Row>
                        :
                        <></>
                    } */}

                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Sign Up</Button>
                    }

                    <p className="bottom-msg-paragraph">Already have an account? <Link to="/auth/login" id="signInCol">Sign In!</Link></p>

                </Form>
            </div>
        </>
    )
}

export default Register;