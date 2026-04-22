import { useState, useContext } from "react";
import { Context } from "../ContextStore";
import { loginUser } from "../Services/userData";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import SimpleSider from "../components/Siders/SimpleSider";
import Header from "../components/Header/Header";

function Login({ history })
{
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [setError] = useState(null);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChanges = (e) =>
    {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmitLogin = (e) =>
    {
        e.preventDefault();
        loginUser(user)
            .then(res =>
            {
                if (res.status === 200)
                {

                    history.push('/');
                } else
                {
                    setLoading(false);
                    // setError(res.error);
                    setAlertShow(true);
                }
            });
        setLoading(true);
    }

    return (
        <>
            <Header />
            <SimpleSider />
            <div className="container auth-form" >
                <h1 className="auth-heading">Sign In</h1>
                <Form className="col-lg-6" onSubmit={handleSubmitLogin}>

                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                Incorrect email or password.
                            </p>
                        </Alert>
                    }

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter your email" onChange={handleChanges} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Enter your Password" onChange={handleChanges} required />
                    </Form.Group>

                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Sign In</Button>
                    }

                    <p className="bottom-msg-paragraph"> Don't have an account? <Link to="/auth/register" id="signUpCol"> Sign Up!</Link></p>
                </Form>
            </div>
        </>
    )
}

export default Login;