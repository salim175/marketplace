import React, { Component } from 'react';
import { Alert, Form } from "react-bootstrap";
import SimpleSiderAdmin from '../../components/AdminSiders/SimpleSiderAdmin';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import { editCurrency, getCurrencyById } from '../../Services/adminServices';
import { Link } from 'react-router-dom';

import Joi from "@hapi/joi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EditCurrency extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            errors: "",
            name: "",
            abr: "",
            isLogin: localStorage.getItem('jwt')
        }
    }

    validateCurrency(currency)
    {
        const schema = Joi.object({
            name: Joi.string().min(3).max(50)
                .error(() =>
                {
                    return new Error("Please enter a Valide name(the name must be between 3 and 50 character)")
                }),
            abr: Joi.string().min(3).max(3)
                .error(() =>
                {
                    return new Error("Please enter a Valide abbreviation(the abbreviation must be 3 character)")
                })
        });
        return schema.validate(currency);
    }

    validateData(currencyEdit)
    {
        const { error } = this.validateCurrency(currencyEdit);
        if (error)
        {
            this.setState({ errors: error.message });
            return false;
        }
        return true;

    }

    componentDidMount()
    {
        getCurrencyById(this.props.location.state.id)
            .then(res =>
            {
                this.setState({
                    name: res.name,
                    abr: res.abr
                })
            })
            .catch(e =>
            {
                console.log(e);
            });
    }
    handleSubmit()
    {
        const currencyToSubmit = {
            name: this.state.name,
            abr: this.state.abr
        }
        if (this.validateData(currencyToSubmit))
        {
            editCurrency(currencyToSubmit, this.props.location.state.id)
                .then((res) =>
                {
                    if (res.status == 200)
                    {
                        toast.success("Edit successfuly");
                    }
                    else
                    {
                        toast.error("ERROR occured while editing Currency");
                    }
                })
                .catch(() => { toast.error("ERROR occured while editing Currency"); });
        }
    }

    render()
    {
        return this.state.isLogin ?
            <div>

                <AdminHeader />

                <SimpleSiderAdmin />

                <label
                    htmlFor='name'
                    style={{ marginLeft: "10px", textAlign: "center" }}
                >
                    Edit Currency name:
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    className="mb-3"
                    style={{ height: "50px", width: "220px", display: 'block', marginLeft: "30px", borderRadius: "5px" }}
                    required
                    value={this.state.name}
                    onChange={(e) => { this.setState({ name: e.target.value }) }}
                />

                <label
                    htmlFor='name'
                    style={{ marginLeft: "10px" }}
                >
                    Edit Category description:
                </label>
                <input
                    id="name"
                    type="text"
                    name="abr"
                    className="mb-3"
                    style={{ height: 50, width: 220, display: "block", marginLeft: "30px", borderRadius: "5px" }}
                    value={this.state.abr}
                    required
                    onChange={(e) => { this.setState({ abr: e.target.value }) }}
                />

                {this.state.errors ?
                    <Form.Group>
                        <Form.Label>
                            <Alert variant="danger" style={{ marginLeft: "10px" }}>{this.state.errors}</Alert>
                        </Form.Label>
                    </Form.Group>
                    :
                    <></>
                }

                {/* <Link to="/admin/currency"> */}
                <button
                    className='btn btn-success'
                    style={{ marginLeft: "100px" }}
                    onClick={() => { this.handleSubmit() }}
                >
                    Submit
                </button>
                {/* </Link> */}
            </div>
            :
            <>
                <SimpleSiderAdmin />
                <h1 style={{ textAlign: "center", fontFamily: "serif" }}>Please Login First</h1>
                <Link to="/auth/admin" style={{ color: "blue" }}>
                    <h5 style={{ textAlign: "center" }}>SignIn Here!</h5>
                </Link>
            </>
    }
}

export default EditCurrency;