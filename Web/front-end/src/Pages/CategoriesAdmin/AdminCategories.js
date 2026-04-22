import React, { Component } from 'react';
import { Button, ListGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import SimpleSiderAdmin from '../../components/AdminSiders/SimpleSiderAdmin';
import { getAllCategory, deleteCategory } from '../../Services/adminServices';
import 'bootstrap/dist/css/bootstrap.min.css';

class AdminCategories extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            list: [],
            isOpen: false,
            categoryToDelete: null,
            isLogin: localStorage.getItem('jwt')
        };
    }

    openModal = (categoryToDelete) => this.setState({
        isOpen: true,
        categoryToDelete: categoryToDelete
    });
    closeModal = () => this.setState({ isOpen: false });
    showModal = e =>
    {
        this.setState({
            show: !this.state.show
        });
    };

    componentDidMount()
    {
        getAllCategory()
            .then(res => { this.setState({ list: res }) })
            .catch(err => { console.log(err) });
    }

    refreshCategories()
    {
        getAllCategory()
            .then(res => { this.setState({ list: res }) })
            .catch(err => { console.log(err) });
    }

    handleRemove(id)
    {
        this.closeModal();
        deleteCategory(id)
            .then(res =>
            {
                this.refreshCategories();
            })
            .catch(err => { console.log(err) });
    }

    render()
    {
        return this.state.isLogin ?
            <>
                <AdminHeader />

                <SimpleSiderAdmin />

                <div style={{ display: "flex" }}>
                    <Link to="/admin/addNewCategory" style={{ marginLeft: "auto", marginRight: "15px" }} >
                        <Button variant="success">+ Add new category</Button>
                    </Link>
                </div>

                <br />

                <h1 style={{ fontFamily: "serif", textAlign: "center", margin: "20px" }}>Category List</h1>

                <div className='container'>
                    <Modal show={this.state.isOpen} onHide={this.closeModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Deleting</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this category</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                            <Button variant="danger" onClick={() => { this.handleRemove(this.state.categoryToDelete) }}>delete</Button>
                        </Modal.Footer>
                    </Modal>

                    <ListGroup as="ol">
                        {this.state.list.map((item) => (
                            <ListGroup.Item as="li" key={item._id} className="d-flex justify-content-between align-items-start">


                                <div className="ms-10 me-auto">
                                    <div className="fw-bold">{item.name}</div>
                                </div>

                                <Link
                                    to={{
                                        pathname: "/admin/categoryDetails",
                                        state: { id: item._id }
                                    }}
                                    style={{ marginLeft: "auto", marginRight: "10px" }}>
                                    <Button variant='primary'>more...</Button>
                                </Link>

                                <Link
                                    to={{
                                        pathname: "/admin/categoryEdit",
                                        state: { id: item._id }
                                    }}
                                    style={{ marginRight: "10px" }}>
                                    <Button variant='warning'>Edit</Button>
                                </Link>

                                <Button variant='danger' onClick={() => { this.openModal(item._id) }}>Delete</Button>

                            </ListGroup.Item>
                        ))}
                    </ListGroup>
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

export default AdminCategories;