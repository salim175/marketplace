import React, { Component } from 'react';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import SimpleSiderAdmin from '../../components/AdminSiders/SimpleSiderAdmin';
import { addCurrency } from '../../Services/adminServices';

import Joi from '@hapi/joi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class AddCurrency extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            currency: "",
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

    validateData(currencyAdd)
    {
        const { error } = this.validateCurrency(currencyAdd);
        if (error)
        {
            this.setState({ errors: error.message });
            // toast.error("ERROR occured while adding Currency")
            return false;
        }
        return true;

    }

    handleSubmit()
    {
        const currencyToAdd = {
            name: this.state.name,
            abr: this.state.abr
        }

        if (this.validateData(currencyToAdd))
        {
            addCurrency(currencyToAdd)
                .then(res =>
                {
                    if (res.status == 200)
                    {
                        toast.success("Added successfuly")
                    }
                    else
                    {
                        toast.error("ERROR occured while adding Currency")
                    }
                })
                .catch(() => { toast.error("ERROR occured while adding Currency") })
        }
    }

    render()
    {
        return this.state.isLogin ?
            <>
                <AdminHeader />
                <SimpleSiderAdmin />

                <label
                    htmlFor='name'
                    style={{ marginLeft: "10px" }}
                >
                    Currency name:
                </label>
                <input
                    id='name'
                    type="text"
                    name='name'
                    className='mb-3'
                    style={{ height: 50, width: 220, display: "block", marginLeft: "30px", borderRadius: "5px" }}
                    required
                    onChange={(e) => { this.setState({ name: e.target.value }) }}
                />

                <label
                    htmlFor='name'
                    style={{ marginLeft: "10px" }}
                >
                    Abbreviation:
                </label>
                <input
                    id='name'
                    type="text"
                    name='abr'
                    className='mb-3'
                    style={{ height: 50, width: 220, display: "block", marginLeft: "30px", borderRadius: "5px" }}
                    required
                    onChange={(e) => { this.setState({ abr: e.target.value }) }}
                />

                {this.state.errors ?
                    <Form.Group>
                        <Form.Label
                            style={{ display: "true" }}
                        >
                            <Alert variant="danger" style={{ marginLeft: "10px" }}>{this.state.errors}</Alert>
                        </Form.Label>
                    </Form.Group>
                    :
                    <></>
                }

                <button
                    className='btn btn-success'
                    style={{ marginLeft: "100px" }}
                    onClick={() => { this.handleSubmit() }}
                >
                    Submit
                </button>
            </>
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

export default AddCurrency;