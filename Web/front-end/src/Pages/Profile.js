import React, { Component } from 'react';
import ProfileSection from "../components/Profile/ProfileSection";
import Header from "../components/Header/Header";
import SimpleSider from "../components/Siders/SimpleSider";
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../components/Profile/Profile.css"
import { ListGroup } from 'react-bootstrap';
import { deleteProduct, getProducts } from '../Services/userData';

class Profile extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isOpen: false,
            products: [],
            previousPage: -1,
            currentPage: 1,
            nextPage: -1,
            productToDelete: null
        }
    }

    openModal = (productToDelete) => this.setState({
        isOpen: true,
        productToDelete: productToDelete
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
        this.loadPage(this.state.currentPage);
    }

    loadPage(page)
    {
        if (page !== -1)
            getProducts(page)
                .then(res =>
                {
                    if (page !== 1)
                        getProducts(page - 1)
                            .then(res => this.setState({ previousPage: res.length > 0 ? page - 1 : -1 }))
                    getProducts(page + 1)
                        .then(res => this.setState({ nextPage: res.length > 0 ? page + 1 : -1 }));
                    this.setState({ products: res, currentPage: page })
                }
                )
                .catch(e => console.log(e))
    }

    hundleDeleteProduct(id)
    {
        this.closeModal();
        deleteProduct(id)
            .then(res =>
            {
                if (this.state.products.length > 1)
                    this.loadPage(this.state.currentPage);
                else
                {
                    if (this.state.currentPage == 1)
                        this.loadPage(1);
                    else
                    {
                        this.loadPage(this.state.currentPage - 1);
                        this.setState({ currentPage: this.state.currentPage - 1 });
                    }
                }
            })
    }
    render()
    {
        return (
            <>
                <Header />
                <SimpleSider />

                <h1 style={{ textAlign: "center", fontFamily: "serif" }} >Profile</h1>
                <ProfileSection />

                {/* <SellerProfile /> */}

                <h1 style={{ fontFamily: "serif", textAlign: "center" }}>Your Products</h1>

                <div className='container'>
                    <Modal show={this.state.isOpen} onHide={this.closeModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Deleting</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this product</Modal.Body>
                        <Modal.Footer>
                            <Button variant='secondary' onClick={this.closeModal}>Close</Button>
                            <Button variant='danger' onClick={() => this.hundleDeleteProduct(this.state.productToDelete)}>Delete</Button>
                        </Modal.Footer>
                    </Modal>
                    {
                        this.state.products.map(
                            product =>
                            (
                                <div key={product._id} >
                                    <Row>
                                        <Col>


                                            <ListGroup style={{ margin: "5px" }} horizontal>
                                                <ListGroup.Item action style={{ borderRadius: "5px" }}>
                                                    <Link to={{
                                                        pathname: `/categories/details`,
                                                        state: { product: product }
                                                    }}>
                                                        <div>
                                                            {product.name}
                                                        </div>
                                                    </Link>
                                                </ListGroup.Item>

                                                <Link
                                                    to={{
                                                        pathname: `/edit-product`,
                                                        state: { product: product }
                                                    }}>
                                                    <Button variant='warning' style={{ marginLeft: "10px", padding: "12px" }} >
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button variant='danger' style={{ marginLeft: "10px" }} onClick={() => { this.openModal(product._id) }}>
                                                    Delete
                                                </Button>
                                            </ListGroup>

                                        </Col>
                                    </Row>
                                </div>
                            ))
                    }
                </div>
                <nav aria-label="Page navigation example" style={{ marginLeft: "50px" }}>
                    <ul className="pagination">
                        <li className="page-item" onClick=
                            {
                                () =>
                                {
                                    this.loadPage(this.state.previousPage)
                                }
                            }>
                            <a className="page-link" aria-label="Previous">
                                <span aria-hidden={this.state.previousPage !== -1} >&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        <li className="page-item"><a className="page-link" >{this.state.currentPage}</a></li>
                        <li className="page-item" onClick=
                            {
                                () =>
                                {
                                    this.loadPage(this.state.nextPage)
                                }
                            }>
                            <a className="page-link" aria-label="Next">
                                <span aria-hidden={this.state.nextPage !== -1} >&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </>
        )
    }
}

export default Profile;