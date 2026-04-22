import React, { Component } from 'react';
import { Alert, Form } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import SimpleSiderAdmin from '../../components/AdminSiders/SimpleSiderAdmin';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import { editCategory, getCategoryById } from '../../Services/adminServices';

import Joi from "@hapi/joi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EditCategory extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            errors: "",
            name: "",
            description: "",
            isLogin: localStorage.getItem('jwt')
        }
    }

    validateCategory(category)
    {
        const schema = Joi.object({
            name: Joi.string().min(3).max(50)
                .error(() =>
                {
                    return new Error("Please enter a Valide name(the name must be between 3 and 50 character)")
                }),
            description: Joi.string().min(20).max(2000)
                .error(() =>
                {
                    return new Error("Please enter a Valide description(the description must be between 20 and 2000 character)")
                }),
        });
        return schema.validate(category);
    }

    validateData(categoryEdit)
    {
        const { error } = this.validateCategory(categoryEdit);
        if (error)
        {
            // console.log(error.message);
            this.setState({ errors: error.message });
            // toast.error("ERROR occured while editing Category");
            return false;
        }
        return true;
    }

    componentDidMount()
    {
        getCategoryById(this.props.location.state.id)
            .then(res =>
            {
                // console.log(res);
                this.setState({
                    name: res.name,
                    description: res.description
                })
            })
            .catch(e => { console.log(e); });
    }

    handleSubmit()
    {
        const categoryToSubmit = {
            name: this.state.name,
            description: this.state.description
        };

        if (this.validateData(categoryToSubmit))
        {
            editCategory(categoryToSubmit, this.props.location.state.id) //editCategory(this.state, this.props.location.state.id)
                .then((res) =>
                {
                    if (res.status == 200)
                    {
                        toast.success("Edit Successfuly");
                    }
                    else
                    {
                        toast.error("ERROR occured while editing Category");
                    }
                })
                .catch(() => { toast.error("ERROR occured while editing Category") });
        }
    }

    render()
    {
        return this.state.isLogin ?
            <>
                <div>

                    <AdminHeader />

                    <SimpleSiderAdmin />

                    <label
                        htmlFor='name'
                        style={{ marginLeft: "10px", textAlign: "center" }}
                    >
                        Edit Category name:
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
                    <textarea
                        id="name"
                        type="text"
                        name="description"
                        className="mb-3"
                        cols="50"
                        rows="10"
                        style={{ display: 'block', marginLeft: "30px", marginBottom: "20px", borderRadius: "5px" }}
                        value={this.state.description}
                        required
                        onChange={(e) => { this.setState({ description: e.target.value }) }}
                    />
                    {this.state.errors ?
                        <Form.Group>
                            <Form.Label
                                style={{ display: "true" }}
                            >
                                {/* <p style={{ color: "red" }}>{this.state.errors}</p> */}
                                <Alert variant="danger" style={{ marginLeft: "10px" }}>{this.state.errors}</Alert>
                            </Form.Label>
                        </Form.Group>
                        :
                        <></>
                    }

                    {/* <Link to="/admin/category"> */}
                    <button
                        className='btn btn-success'
                        style={{ marginLeft: "180px" }}
                        onClick={() => { this.handleSubmit() }}
                    >
                        Submit
                    </button>
                    {/* </Link> */}
                </div>
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

export default EditCategory;